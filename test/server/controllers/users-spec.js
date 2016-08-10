'use strict';

var _        = require('lodash');
var request  = require('supertest');
var should   = require('should');
var app      = require('../../../server/app');
var testUtil = require('../../test-util/test-util');
var User     = require('mongoose').model('user');

describe('controllers', () => {
  describe('users', () => {
    describe('getUsers', () => {
      var initialUsers = [
        {
          _id: testUtil.ObjectId(),
          name: 'user1',
          email: 'user1@mail.com'
        },
        {
          _id: testUtil.ObjectId(),
          name: 'user2',
          email: 'user2@mail.com'
        },
        {
          _id: testUtil.ObjectId(),
          name: 'user3',
          email: 'user3@mail.com'
        }
      ];

      function test(expectedStatus, expectedBody, done) {
        User
          .create(initialUsers)
          .then(() => new Promise((resolve, reject) => {
            request(app)
              .get('/api/users/')
              .expect(expectedStatus)
              .expect('Content-Type', /json/)
              .expect(res => testUtil.assert(res.body[1], expectedBody[1]))
              .end(err => testUtil.resolveOrReject(err, resolve, reject));
          }))
          .then(() => done())
          .catch(done);
      }

      it('should return status 200 and users', done => {
        var expectedStatus = 200;
        var expectedBody = _.map(initialUsers, user => {
          var userCopy = _.cloneDeep(user);
          userCopy._id = user._id; // rewrite id after clone
          return userCopy;
        });

        test(expectedStatus, expectedBody, done);
      });
    });

    describe('getUserById', () => {
      var initialUsers = [
        {
          _id: testUtil.ObjectId(),
          name: 'user1',
          email: 'user1@mail.com'
        },
        {
          _id: testUtil.ObjectId(),
          name: 'user2',
          email: 'user2@mail.com'
        },
        {
          _id: testUtil.ObjectId(),
          name: 'user3',
          email: 'user3@mail.com'
        }
      ];

      function test(userId, expectedStatus, expectedBody, done) {
        User
          .create(initialUsers)
          .then(() => new Promise((resolve, reject) => {
              request(app)
                .get('/api/users/' + userId)
                .expect(expectedStatus)
                .expect('Content-Type', /json/)
                .expect(res => testUtil.assert(res.body, expectedBody))
                .end(err => testUtil.resolveOrReject(err, resolve, reject));
          }))
          .then(() => done())
          .catch(done);
      }

      it('should return status 422 when req.params._id is invalid', done => {
        var userId = 'Invalid Id';
        var expectedStatus = 422;
        var expectedBody = {
          reason: 'id must be a valid id'
        };

        test(userId, expectedStatus, expectedBody, done);
      });

      it('should return status 404 when user is not found by req.params._id', done => {
        var userId = testUtil.ObjectId();
        var expectedStatus = 404;
        var expectedBody = {
          reason: 'user is not found'
        };

        test(userId, expectedStatus, expectedBody, done);
      });

      it('should return status 200 and user when user is found by req.params._id', done => {
        var userId = initialUsers[0]._id;
        var expectedStatus = 200;
        var expectedBody = _.cloneDeep(initialUsers[0]);
        expectedBody._id = userId;

        test(userId, expectedStatus, expectedBody, done);
      });
    });

    describe('createUser', function() {
      var initialUsers = [
        {
          _id: testUtil.ObjectId(),
          name: 'user1',
          email: 'user1@mail.com'
        },
        {
          _id: testUtil.ObjectId(),
          name: 'user2',
          email: 'user2@mail.com'
        },
        {
          _id: testUtil.ObjectId(),
          name: 'user3',
          email: 'user3@mail.com'
        }
      ];

      function test(userData, expectedStatus, expectedBody, done) {
        User
          .create(initialUsers)
          .then(() => new Promise((resolve, reject) => {
              request(app)
                .post('/api/users')
                .send(userData)
                .expect(expectedStatus)
                .expect('Content-Type', /application\/json/)
                .expect(res => testUtil.assert(res.body, expectedBody))
                .end(err => testUtil.resolveOrReject(err, resolve, reject));
          }))
          .then(() => done())
          .catch(done);
      }

      it('should return status 422 when req.body is empty', done => {
        var userData;
        var expectedStatus = 422;
        var expectedBody = {
          reason: 'name is required'
        };

        test(userData, expectedStatus, expectedBody, done);
      });

      it('should return status 422 when req.body.name is not defined', done => {
        var userData = {
          email: 'new-user@mail.com'
        };
        var expectedStatus = 422;
        var expectedBody = {
          reason: 'name is required'
        };

        test(userData, expectedStatus, expectedBody, done);
      });

      it('should return status 422 when req.body.email is not valid email', done => {
        var userData = {
          name: 'new-user',
          email: 'invalidEmail'
        };
        var expectedStatus = 422;
        var expectedBody = {
          reason: 'email is required and must be a valid email'
        };

        test(userData, expectedStatus, expectedBody, done);
      });

      it('should return status 200 and create a new user when req.body is valid', done => {
        var userData = {
          name: 'new-user',
          email: 'new-user@mail.com'
        };
        var expectedStatus = 200;
        var expectedBody = {
          _id: '_mock_',
          name: 'new-user',
          email: 'new-user@mail.com'
        };

        test(userData, expectedStatus, expectedBody, done);
      });
    });

    describe('updateUser', function() {
      var initialUsers = [
        {
          _id: testUtil.ObjectId(),
          name: 'user1',
          email: 'user1@mail.com'
        },
        {
          _id: testUtil.ObjectId(),
          name: 'user2',
          email: 'user2@mail.com'
        },
        {
          _id: testUtil.ObjectId(),
          name: 'user3',
          email: 'user3@mail.com'
        }
      ];

      function test(userId, userData, expectedStatus, expectedBody, done) {
        User
          .create(initialUsers)
          .then(() => new Promise((resolve, reject) => {
              request(app)
                .put('/api/users/' + userId)
                .send(userData)
                .expect(expectedStatus)
                .expect('Content-Type', /application\/json/)
                .expect(res => testUtil.assert(res.body, expectedBody))
                .end(err => testUtil.resolveOrReject(err, resolve, reject));
          }))
          .then(() => done())
          .catch(done);
      }

      it('should return status 422 when req.params._id is invalid', done => {
        var userId = 'InvalidId';
        var userData = {
          name: 'user1-new',
          email: 'user1-new@mail.com'
        };
        var expectedStatus = 422;
        var expectedBody = {
          reason: 'id must be a valid id'
        };

        test(userId, userData, expectedStatus, expectedBody, done);
      });

      it('should return status 422 when req.body is empty', done => {
        var userId = initialUsers[0]._id;
        var userData;
        var expectedStatus = 422;
        var expectedBody = {
          reason: 'name is required'
        };

        test(userId, userData, expectedStatus, expectedBody, done);
      });

      it('should return status 422 when req.body.name is not defined', done => {
        var userId = initialUsers[0]._id;
        var userData = {
          email: 'user1-new@mail.com'
        };
        var expectedStatus = 422;
        var expectedBody = {
          reason: 'name is required'
        };

        test(userId, userData, expectedStatus, expectedBody, done);
      });

      it('should return status 422 when req.body.email is not valid email', done => {
        var userId = initialUsers[0]._id;
        var userData = {
          name: 'user1-new',
          email: 'invalidEmail'
        };
        var expectedStatus = 422;
        var expectedBody = {
          reason: 'email is required and must be a valid email'
        };

        test(userId, userData, expectedStatus, expectedBody, done);
      });

      it('should return status 404 when user is not found by req.params._id', done => {
        var userId = testUtil.ObjectId();
        var userData = {
          name: 'user1-new',
          email: 'user1-new@mail.com'
        };
        var expectedStatus = 404;
        var expectedBody = {
          reason: 'user is not found'
        };

        test(userId, userData, expectedStatus, expectedBody, done);
      });

      it('should return status 200 and update an user when req.body is valid', done => {
        var userId = initialUsers[0]._id;
        var userData = {
          name: 'user1-new',
          email: 'user1-new@mail.com'
        };
        var expectedStatus = 200;
        var expectedBody = _.cloneDeep(userData);
        expectedBody._id = initialUsers[0]._id;

        test(userId, userData, expectedStatus, expectedBody, done);
      });
    });

    describe('deleteUser', () => {
      var initialUsers = [
        {
          _id: testUtil.ObjectId(),
          name: 'user1',
          email: 'user1@mail.com'
        },
        {
          _id: testUtil.ObjectId(),
          name: 'user2',
          email: 'user2@mail.com'
        },
        {
          _id: testUtil.ObjectId(),
          name: 'user3',
          email: 'user3@mail.com'
        }
      ];

      function test(userId, expectedStatus, expectedBody, done) {
        User
          .create(initialUsers)
          .then(() => new Promise((resolve, reject) => {
              request(app)
                .delete('/api/users/' + userId)
                .expect(expectedStatus)
                .expect(res => {
                  if (expectedStatus !== 203) {
                    should(res.headers['content-type']).be.match(/json/);
                    testUtil.assert(res.body, expectedBody);
                  } else {
                    should(res.body).eql({});
                  }
                })  
                .end(err => testUtil.resolveOrReject(err, resolve, reject));
          }))
          .then(() => done())
          .catch(done);
      }

      it('should return status 422 when req.params._id is invalid', done => {
        var userId = 'Invalid Id';
        var expectedStatus = 422;
        var expectedBody = {
          reason: 'id must be a valid id'
        };

        test(userId, expectedStatus, expectedBody, done);
      });

      it('should return status 404 when user is not found by req.params._id', done => {
        var userId = testUtil.ObjectId();
        var expectedStatus = 404;
        var expectedBody = {
          reason: 'user is not found'
        };

        test(userId, expectedStatus, expectedBody, done);
      });

      it('should return status 203 and delete user', done => {
        var userId = initialUsers[0]._id;
        var expectedStatus = 203;
        var expectedBody;

        test(userId, expectedStatus, expectedBody, done);
      });
    });
  });
});
