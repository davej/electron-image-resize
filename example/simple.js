var electronImageResize = require('../');
var join = require('path').join;
var { writeFileSync } = require('fs');
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
    writeFileSync(
      join(__dirname, filename),
      img.toPng()
    );
  }, console.log.bind(console));
});
