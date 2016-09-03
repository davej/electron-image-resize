const electron = require('electron');
const Application = require('spectron').Application;
const assert = require('assert');
const { join } = require('path');
const { stat, unlinkSync } = require('fs');

const delay = time => new Promise(resolve => setTimeout(resolve, time));

describe('application launch', function appLaunch() {
  this.timeout(10000);
  const exampleDir = join(__dirname, '..', 'example');
  const resizedPng = join(exampleDir, 'resized-test.png');

  beforeEach(() => {
    try {
      unlinkSync(resizedPng);
    } catch (e) {
      // do nothing
    }


    this.app = new Application({
      path: electron,
      args: [join(exampleDir, 'simple')]
    });
    return this.app.start();
  });

  it('shows an initial window', done => {
    const expectedSize = 14418;

    delay(3000).then(() => {
      stat(resizedPng, (err, info) => {
        if (err) assert.fail(err);
        assert.equal(info.size, expectedSize);
        done();
      });
    });
  });
});
