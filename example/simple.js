var electronImageResize = require('../');
var join = require('path').join;
var writeFile = require('fs').writeFile;
const { app } = require('electron');

process.on('uncaughtException', (error) => {
  console.error(error);
});

app.on('ready', () => {
  electronImageResize({
    url: `file://${join(__dirname, 'test.jpg')}`,
    width: 40,
    height: 40
  }).then(img => {
    var filename = 'resized-test.png';
    writeFile(
      join(__dirname, filename),
      img.toPng(),
      () => console.log(`image written to ${filename}`)
    );
  }, console.log.bind(console));
});
