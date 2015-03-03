/* global describe, it */

var requestAgent = require('supertest');
var app          = require('../../server/app.js');
require('../test-util/db-util');

describe('invalid requests', function() {
  it('should return 404.html when route is unknown', function(done) {
    requestAgent(app)
      .get('/invalid-url')
      .expect(404)
      .expect('Content-Type', /text\/html/)
      .end(done);
  });
});
