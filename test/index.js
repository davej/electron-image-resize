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
      console.log(`Deleted: ${resizedPng}`);
    } catch (e) {
      // do nothing
    }


    this.app = new Application({
      path: electron,
      args: [join(exampleDir, 'simple')]
    });
    this.app.start();
    return delay(2000);
  });

  it('shows an initial window', done => {
    delay(3000).then(() => {
      stat(resizedPng, (err, info) => {
        console.log(info);
        if (err) {
          assert.fail(err);
          return done();
        }
        assert.ok(info.size > 1024, `File size was ${info.size}B, should be > 1KB`);
        return done();
      });
    });
  });
});
