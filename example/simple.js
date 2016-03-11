var electronImageResize = require('../');
var join = require('path').join;
var writeFile = require('fs').writeFile;
const electron = require('electron');
const app = electron.app;

process.on('uncaughtException', function(error) {
  console.error(error);
});

app.on('ready', function() {
  electronImageResize({
    url: 'file://' + join(__dirname, 'test.jpg'),
    width: 40,
    height: 40
  }).then(function(img) {
    var filename = 'resized-test.png';
    writeFile(
      join(__dirname, filename),
      img.toPng(),
      function() { console.log('image written to ' + filename); }
    );
  }, console.log);
});
