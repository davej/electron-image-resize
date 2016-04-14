# electron-image-resize

> Resize images using Electron. Supports all image types that Chromium/Electron supports, outputs to png, jpeg, dataUrl or NativeImage.


## Install

```
$ npm install --save electron-image-resize
```


## Usage

```js
const electronImageResize = require('electron-image-resize');
const { writeFileSync } = require('fs');

// Resize the svg image to 40x40
electronImageResize({
  url: 'http://electron.atom.io/images/electron-logo.svg',
  width: 40,
  height: 40
}).then(img => {
  // save it as a png file
  writeFileSync('/some/path/electron.png', img.toPng());
})
```


## API

### electronImageResize(options)

#### options

##### url

Type: `string`  
*Required*

URL of image to resize. For local paths prefix the path with '`file://`'.

##### width and height

Type: `number`  
*At Least One Is Required*

The width in pixels to resize the image to.
The height in pixels to resize the image to.
If only one dimension is provided, the image will be re-sized so that the original height/width ratio is maintained.

##### delay

Type: `boolean`  
Default: `500`

We will wait until the image is loaded but often you will need to also add a delay to give the renderer time to paint the image before capturing it.


#### Returns

Returns a promise which resolves to a [NativeImage](https://github.com/atom/electron/blob/master/docs/api/native-image.md). Use methods like `.toPng()` and `.toJpeg()` to get a buffer which you can use to write to the file system.

## License

MIT © [DaveJ](https://twitter.com/DaveJ)
