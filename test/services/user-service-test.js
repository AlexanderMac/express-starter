/* global describe, it */
/* jshint -W030 */

var _                     = require('lodash');
var userSrv               = require('../../server/services/user-service');
var UserModel             = require('../../server/models/user-model');
var testUtil              = require('../test-util/test-util');
require('../test-util/db-util');

describe('request-service', function() {
  
  describe('getList', function() { 
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
    
    function test(users, keys, expected, done) {
      testUtil
        .save(UserModel, users)
        .then(function() {
          return userSrv.getList(keys);
        })
        .then(function(actual) {
          actual = _.sortBy(actual, '_id');
          expected = _.sortBy(expected, '_id');
          testUtil.assert(actual, expected);
          done();
        })
        .fail(done);
    }
    
    it('should return empty list when Users collection is empty', function(done) {
      var keys = null;
      var expected = [];
      
      test([], keys, expected, done);
    });
    
    it('should return list with all the UserModels[_id]', function(done) {
      var keys = ['name', 'email'];
      var expected = initialUsers;
      
      test(initialUsers, keys, expected, done);
    });
  });
  
});
