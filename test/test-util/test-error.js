function TestError(err) {
  if (err instanceof Error) {
    this.message = err.message;
  } else {
    this.message = err;
  }
  this.name = 'TestError';
}

TestError.prototype = new Error();

module.exports = TestError;
