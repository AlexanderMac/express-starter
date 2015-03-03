/* global describe, it */
/* jshint -W030 */

var requestAgent = require('supertest');
var app          = require('../../server/app.js');
var UserModel    = require('../../server/models/user-model');
var testUtil     = require('../test-util/test-util');
require('../test-util/db-util');

describe('user-routes', function() {
  
  describe('GET /users', function() {
    var initialUsers = [
      {
        _id: testUtil.ObjectId(),
        name: 'u1',
        email: 'u1@mail.com'
      },
      {
        _id: testUtil.ObjectId(),
        name: 'u2'
      },
      {
        _id: testUtil.ObjectId(),
        name: 'u3',
        email: 'u3@mail.com'
      }
    ];
    
    function test(users, done) {
      testUtil
        .save(UserModel, users)
        .then(function() {
          requestAgent(app)
            .get('/users')
            .expect(200)
            .expect('Content-Type', /text\/html/)
            .end(done);
        })
        .fail(done);
    }
  
    it('should return 200.html with all the Users', function(done) {
      test(initialUsers, done);
    });
  });
  
});
