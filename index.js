'use strict';

var BrowserWindow = require('browser-window');

module.exports = function electronImageResize(opts) {
  opts = opts || {};

  return new Promise(function(resolve, reject) {
    if (typeof opts.url !== 'string') {
      reject(new TypeError('Expected option: `url` of type string'));
    }

    if (typeof opts.height !== 'number') {
      reject(new TypeError('Expected option: `height` of type number'));
    }

    if (typeof opts.width !== 'number') {
      reject(new TypeError('Expected option: `width` of type number'));
    }

    if (typeof opts.delay !== 'number') {
      // We seem to need a delay otherwise the image isn't captured
      opts.delay = 500;
    }

    var win = new BrowserWindow({
      x: 0,
      y: 0,
      width: opts.width,
      height: opts.height,
      show: false,
      frame: false,
      'enable-larger-than-screen': true,
      'node-integration': false
    });
    win.loadURL(opts.url);
    win.webContents.on('did-fail-load', function(ev, errCode, errDescription, url) {
      reject(new Error(`failed loading: ${url} ${errDescription}`));
    });
    win.webContents.on('did-finish-load', function() {
      win.webContents.insertCSS('img { width: 100%; height: 100%; }');
      setTimeout(function() {
        win.capturePage(function(img) {
          resolve(img);
          win.close();
        });
      }, opts.delay);
    });
  });
};
