'use strict';

var electron = require('electron');
var BrowserWindow = electron.BrowserWindow || electron.remote.BrowserWindow;
var nativeImage = electron.nativeImage;

module.exports = function electronImageResize(params) {
  var opts = params || {};
  return new Promise((resolve, reject) => {
    if (typeof opts.url !== 'string') {
      reject(new TypeError('Expected option: `url` of type string'));
    }

    if (typeof opts.height !== 'number' && typeof opts.width !== 'number') {
      reject(new TypeError('Expected option: `height` or `width` of type number'));
    }

    if (!(typeof opts.height === 'number' && typeof opts.width === 'number')) {
      var imageLocation = opts.url.replace('file://', '');
      var originalSize = nativeImage.createFromPath(imageLocation).getSize();

      if (typeof opts.height !== 'number') {
        opts.height = parseInt(originalSize.height * opts.width / originalSize.width, 10);
      } else {
        opts.width = parseInt(originalSize.width * opts.height / originalSize.height, 10);
      }
    }

    if (typeof opts.delay !== 'number') {
      // We seem to need a delay otherwise the image isn't captured because it
      // hasn't been painted yet.
      // Ideally we would want something deterministic like Mozilla's `afterPaint`
      // event in Chromium/Electron.
      // You may need to increase the delay when dealing with very large images
      opts.delay = 500;
    }

    var win = new BrowserWindow({
      x: 0,
      y: 0,
      width: opts.width,
      height: opts.height,
      show: false,
      frame: false,
      enableLargerThanScreen: true,
      webPreferences: {
        nodeIntegration: false
      }
    });

    win.on('closed', () => {
      win = null;
    });

    win.loadURL(opts.url);

    win.webContents.on('did-fail-load', (ev, errCode, errDescription, url) => {
      reject(new Error(`failed loading: ${url} ${errDescription}`));
    });
    win.webContents.on('did-finish-load', () => {
      win.webContents.insertCSS('img { width: 100%; height: 100%; }');
      setTimeout(() => {
        win.capturePage(img => {
          resolve(img);
          win.close();
        });
      }, opts.delay);
    });
  });
};
