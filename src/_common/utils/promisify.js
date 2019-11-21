global.Promise = require('bluebird');

Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});
