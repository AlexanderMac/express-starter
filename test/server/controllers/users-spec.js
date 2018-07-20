'use strict';

const _        = require('lodash');
const request  = require('supertest');
const should   = require('should');
const nassert  = require('n-assert');
const app      = require('../../../server/app');
const User     = require('mongoose').model('user');

describe('controllers / users', () => {
  describe('getUsers', () => {
    let initialUsers = [
      {
        _id: nassert.getObjectId(),
        name: 'user1',
        email: 'user1@mail.com'
      },
      {
        _id: nassert.getObjectId(),
        name: 'user2',
        email: 'user2@mail.com'
      },
      {
        _id: nassert.getObjectId(),
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
            .expect(res => nassert.assert(res.body[1], expectedBody[1]))
            .end(err => nassert.resolveOrReject(err, resolve, reject));
        }))
        .then(() => done())
        .catch(done);
    }

    it('should return status 200 and users', done => {
      let expectedStatus = 200;
      let expectedBody = _.map(initialUsers, user => {
        let userCopy = _.cloneDeep(user);
        userCopy._id = user._id; // rewrite id after clone
        return userCopy;
      });

      test(expectedStatus, expectedBody, done);
    });
  });

  describe('getUserById', () => {
    let initialUsers = [
      {
        _id: nassert.getObjectId(),
        name: 'user1',
        email: 'user1@mail.com'
      },
      {
        _id: nassert.getObjectId(),
        name: 'user2',
        email: 'user2@mail.com'
      },
      {
        _id: nassert.getObjectId(),
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
            .expect(res => nassert.assert(res.body, expectedBody))
            .end(err => nassert.resolveOrReject(err, resolve, reject));
        }))
        .then(() => done())
        .catch(done);
    }

    it('should return status 422 when req.params._id is invalid', done => {
      let userId = 'Invalid Id';
      let expectedStatus = 422;
      let expectedBody = {
        reason: 'id must be a valid id'
      };

      test(userId, expectedStatus, expectedBody, done);
    });

    it('should return status 404 when user is not found by req.params._id', done => {
      let userId = nassert.getObjectId();
      let expectedStatus = 404;
      let expectedBody = {
        reason: 'user is not found'
      };

      test(userId, expectedStatus, expectedBody, done);
    });

    it('should return status 200 and user when user is found by req.params._id', done => {
      let userId = initialUsers[0]._id;
      let expectedStatus = 200;
      let expectedBody = _.cloneDeep(initialUsers[0]);
      expectedBody._id = userId;

      test(userId, expectedStatus, expectedBody, done);
    });
  });

  describe('createUser', () => {
    let initialUsers = [
      {
        _id: nassert.getObjectId(),
        name: 'user1',
        email: 'user1@mail.com'
      },
      {
        _id: nassert.getObjectId(),
        name: 'user2',
        email: 'user2@mail.com'
      },
      {
        _id: nassert.getObjectId(),
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
            .expect(res => nassert.assert(res.body, expectedBody))
            .end(err => nassert.resolveOrReject(err, resolve, reject));
        }))
        .then(() => done())
        .catch(done);
    }

    it('should return status 422 when req.body is empty', done => {
      let userData;
      let expectedStatus = 422;
      let expectedBody = {
        reason: 'name is required'
      };

      test(userData, expectedStatus, expectedBody, done);
    });

    it('should return status 422 when req.body.name is not defined', done => {
      let userData = {
        email: 'new-user@mail.com'
      };
      let expectedStatus = 422;
      let expectedBody = {
        reason: 'name is required'
      };

      test(userData, expectedStatus, expectedBody, done);
    });

    it('should return status 422 when req.body.email is not valid email', done => {
      let userData = {
        name: 'new-user',
        email: 'invalidEmail'
      };
      let expectedStatus = 422;
      let expectedBody = {
        reason: 'email is required and must be a valid email'
      };

      test(userData, expectedStatus, expectedBody, done);
    });

    it('should return status 200 and create a new user when req.body is valid', done => {
      let userData = {
        name: 'new-user',
        email: 'new-user@mail.com'
      };
      let expectedStatus = 200;
      let expectedBody = {
        _id: '_mock_',
        name: 'new-user',
        email: 'new-user@mail.com'
      };

      test(userData, expectedStatus, expectedBody, done);
    });
  });

  describe('updateUser', () => {
    let initialUsers = [
      {
        _id: nassert.getObjectId(),
        name: 'user1',
        email: 'user1@mail.com'
      },
      {
        _id: nassert.getObjectId(),
        name: 'user2',
        email: 'user2@mail.com'
      },
      {
        _id: nassert.getObjectId(),
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
            .expect(res => nassert.assert(res.body, expectedBody))
            .end(err => nassert.resolveOrReject(err, resolve, reject));
        }))
        .then(() => done())
        .catch(done);
    }

    it('should return status 422 when req.params._id is invalid', done => {
      let userId = 'InvalidId';
      let userData = {
        name: 'user1-new',
        email: 'user1-new@mail.com'
      };
      let expectedStatus = 422;
      let expectedBody = {
        reason: 'id must be a valid id'
      };

      test(userId, userData, expectedStatus, expectedBody, done);
    });

    it('should return status 422 when req.body is empty', done => {
      let userId = initialUsers[0]._id;
      let userData;
      let expectedStatus = 422;
      let expectedBody = {
        reason: 'name is required'
      };

      test(userId, userData, expectedStatus, expectedBody, done);
    });

    it('should return status 422 when req.body.name is not defined', done => {
      let userId = initialUsers[0]._id;
      let userData = {
        email: 'user1-new@mail.com'
      };
      let expectedStatus = 422;
      let expectedBody = {
        reason: 'name is required'
      };

      test(userId, userData, expectedStatus, expectedBody, done);
    });

    it('should return status 422 when req.body.email is not valid email', done => {
      let userId = initialUsers[0]._id;
      let userData = {
        name: 'user1-new',
        email: 'invalidEmail'
      };
      let expectedStatus = 422;
      let expectedBody = {
        reason: 'email is required and must be a valid email'
      };

      test(userId, userData, expectedStatus, expectedBody, done);
    });

    it('should return status 404 when user is not found by req.params._id', done => {
      let userId = nassert.getObjectId();
      let userData = {
        name: 'user1-new',
        email: 'user1-new@mail.com'
      };
      let expectedStatus = 404;
      let expectedBody = {
        reason: 'user is not found'
      };

      test(userId, userData, expectedStatus, expectedBody, done);
    });

    it('should return status 200 and update an user when req.body is valid', done => {
      let userId = initialUsers[0]._id;
      let userData = {
        name: 'user1-new',
        email: 'user1-new@mail.com'
      };
      let expectedStatus = 200;
      let expectedBody = _.cloneDeep(userData);
      expectedBody._id = initialUsers[0]._id;

      test(userId, userData, expectedStatus, expectedBody, done);
    });
  });

  describe('deleteUser', () => {
    let initialUsers = [
      {
        _id: nassert.getObjectId(),
        name: 'user1',
        email: 'user1@mail.com'
      },
      {
        _id: nassert.getObjectId(),
        name: 'user2',
        email: 'user2@mail.com'
      },
      {
        _id: nassert.getObjectId(),
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
                nassert.assert(res.body, expectedBody);
              } else {
                should(res.body).eql({});
              }
            })
            .end(err => nassert.resolveOrReject(err, resolve, reject));
        }))
        .then(() => done())
        .catch(done);
    }

    it('should return status 422 when req.params._id is invalid', done => {
      let userId = 'Invalid Id';
      let expectedStatus = 422;
      let expectedBody = {
        reason: 'id must be a valid id'
      };

      test(userId, expectedStatus, expectedBody, done);
    });

    it('should return status 404 when user is not found by req.params._id', done => {
      let userId = nassert.getObjectId();
      let expectedStatus = 404;
      let expectedBody = {
        reason: 'user is not found'
      };

      test(userId, expectedStatus, expectedBody, done);
    });

    it('should return status 203 and delete user', done => {
      let userId = initialUsers[0]._id;
      let expectedStatus = 203;
      let expectedBody;

      test(userId, expectedStatus, expectedBody, done);
    });
  });
});
