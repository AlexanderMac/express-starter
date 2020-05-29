const _ = require('lodash');
const mongoose = require('mongoose');
const request = require('supertest');
const should = require('should');
const nassert = require('n-assert');
const app = require('../../src/app');

const User = mongoose.model('user');

describe('users / controller', () => {
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

    async function test({ expectedStatus, expectedBody }) {
      await User.create(initialUsers);

      return request(app)
        .get('/api/users/')
        .expect(expectedStatus)
        .expect('Content-Type', /json/)
        .expect(res => nassert.assert(_.sortBy(res.body, 'userId'), _.sortBy(expectedBody, 'userId')));
    }

    it('should return status 200 and list of users', () => {
      let expectedStatus = 200;
      let expectedBody = _.map(initialUsers, user => {
        let userCopy = _.cloneDeep(user);
        userCopy.userId = user._id; // rewrite id after clone
        delete userCopy._id;
        return userCopy;
      });

      return test({ expectedStatus, expectedBody });
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

    async function test({ userId, expectedStatus, expectedBody }) {
      await User.create(initialUsers);

      return request(app)
        .get('/api/users/' + userId)
        .expect(expectedStatus)
        .expect('Content-Type', /json/)
        .expect(res => nassert.assert(res.body, expectedBody));
    }

    it('should return status 422 when req.params.userId is invalid', () => {
      let userId = 'Invalid Id';
      let expectedStatus = 422;
      let expectedBody = {
        message: 'userId must be a valid ObjectId'
      };

      return test({ userId, expectedStatus, expectedBody });
    });

    it('should return status 404 when user is not found by req.params.userId', () => {
      let userId = nassert.getObjectId();
      let expectedStatus = 404;
      let expectedBody = {
        message: 'user is not found'
      };

      return test({ userId, expectedStatus, expectedBody });
    });

    it('should return status 200 and user', () => {
      let userId = initialUsers[0]._id;
      let expectedStatus = 200;
      let expectedBody = _.cloneDeep(initialUsers[0]);
      expectedBody.userId = userId;
      delete expectedBody._id;

      return test({ userId, expectedStatus, expectedBody });
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

    async function test({ userData, expectedStatus, expectedBody }) {
      await User.create(initialUsers);

      return request(app)
        .post('/api/users')
        .send(userData)
        .expect(expectedStatus)
        .expect('Content-Type', /application\/json/)
        .expect(res => nassert.assert(res.body, expectedBody));
    }

    it('should return status 422 when req.body is empty', () => {
      let userData;
      let expectedStatus = 422;
      let expectedBody = {
        message: 'name is required'
      };

      return test({ userData, expectedStatus, expectedBody });
    });

    it('should return status 422 when req.body.name is undefined', () => {
      let userData = {
        email: 'new-user@mail.com'
      };
      let expectedStatus = 422;
      let expectedBody = {
        message: 'name is required'
      };

      return test({ userData, expectedStatus, expectedBody });
    });

    it('should return status 422 when req.body.email is undefined', () => {
      let userData = {
        name: 'new-user'
      };
      let expectedStatus = 422;
      let expectedBody = {
        message: 'email is required'
      };

      return test({ userData, expectedStatus, expectedBody });
    });

    it('should return status 422 when req.body.email is not valid email', () => {
      let userData = {
        name: 'new-user',
        email: 'invalidEmail'
      };
      let expectedStatus = 422;
      let expectedBody = {
        message: 'email must be a valid email address'
      };

      return test({ userData, expectedStatus, expectedBody });
    });

    it('should return status 200 and create a new user when req.body is valid', () => {
      let userData = {
        name: 'new-user',
        email: 'new-user@mail.com'
      };
      let expectedStatus = 201;
      let expectedBody = {
        userId: '_mock_',
        name: 'new-user',
        email: 'new-user@mail.com'
      };

      return test({ userData, expectedStatus, expectedBody });
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

    async function test({ userId, userData, expectedStatus, expectedBody }) {
      await User.create(initialUsers);

      return request(app)
        .put('/api/users/' + userId)
        .send(userData)
        .expect(expectedStatus)
        .expect(res => {
          if (expectedStatus === 204) {
            should(res.headers['content-type']).is.undefined;
          } else {
            should(res.headers['content-type']).match(/application\/json/);
          }
          nassert.assert(res.body, expectedBody, true);
        });
    }

    it('should return status 422 when req.params.userId is invalid', () => {
      let userId = 'InvalidId';
      let userData = {
        name: 'user1-new',
        email: 'user1-new@mail.com'
      };
      let expectedStatus = 422;
      let expectedBody = {
        message: 'userId must be a valid ObjectId'
      };

      return test({ userId, userData, expectedStatus, expectedBody });
    });

    it('should return status 422 when req.body is empty', () => {
      let userId = initialUsers[0]._id;
      let userData;
      let expectedStatus = 422;
      let expectedBody = {
        message: 'name is required'
      };

      return test({ userId, userData, expectedStatus, expectedBody });
    });

    it('should return status 422 when req.body.name is undefined', () => {
      let userId = initialUsers[0]._id;
      let userData = {
        email: 'user1-new@mail.com'
      };
      let expectedStatus = 422;
      let expectedBody = {
        message: 'name is required'
      };

      return test({ userId, userData, expectedStatus, expectedBody });
    });

    it('should return status 422 when req.body.email is undefined', () => {
      let userId = initialUsers[0]._id;
      let userData = {
        name: 'user1-new'
      };
      let expectedStatus = 422;
      let expectedBody = {
        message: 'email is required'
      };

      return test({ userId, userData, expectedStatus, expectedBody });
    });

    it('should return status 422 when req.body.email is not valid email', () => {
      let userId = initialUsers[0]._id;
      let userData = {
        name: 'user1-new',
        email: 'invalidEmail'
      };
      let expectedStatus = 422;
      let expectedBody = {
        message: 'email must be a valid email address'
      };

      return test({ userId, userData, expectedStatus, expectedBody });
    });

    it('should return status 404 when user is not found by req.params.userId', () => {
      let userId = nassert.getObjectId();
      let userData = {
        name: 'user1-new',
        email: 'user1-new@mail.com'
      };
      let expectedStatus = 404;
      let expectedBody = {
        message: 'user is not found'
      };

      return test({ userId, userData, expectedStatus, expectedBody });
    });

    it('should return status 200 and update an user when req.body is valid', () => {
      let userId = initialUsers[0]._id;
      let userData = {
        name: 'user1-new',
        email: 'user1-new@mail.com'
      };
      let expectedStatus = 204;
      let expectedBody = {};

      return test({ userId, userData, expectedStatus, expectedBody });
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

    async function test({ userId, expectedStatus, expectedBody }) {
      await User.create(initialUsers);

      return request(app)
        .delete('/api/users/' + userId)
        .expect(expectedStatus)
        .expect(res => {
          if (expectedStatus === 204) {
            should(res.headers['content-type']).is.undefined;
          } else {
            should(res.headers['content-type']).match(/application\/json/);
          }
          nassert.assert(res.body, expectedBody, true);
        });
    }

    it('should return status 422 when req.params.userId is invalid', () => {
      let userId = 'Invalid Id';
      let expectedStatus = 422;
      let expectedBody = {
        message: 'userId must be a valid ObjectId'
      };

      return test({ userId, expectedStatus, expectedBody });
    });

    it('should return status 404 when user is not found by req.params.userId', () => {
      let userId = nassert.getObjectId();
      let expectedStatus = 404;
      let expectedBody = {
        message: 'user is not found'
      };

      return test({ userId, expectedStatus, expectedBody });
    });

    it('should return status 204 and delete user', () => {
      let userId = initialUsers[0]._id;
      let expectedStatus = 204;
      let expectedBody = {};

      return test({ userId, expectedStatus, expectedBody });
    });
  });
});
