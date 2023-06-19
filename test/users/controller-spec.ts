import { cloneDeep, map, sortBy } from 'lodash'
// @ts-ignore
import * as nassert from 'n-assert'
import * as should from 'should'
import * as request from 'supertest'

import { app } from '../../src'
import { User } from '../../src/users/model'

describe('users / controller', () => {
  describe('getUsers', () => {
    const initialUsers = [
      {
        _id: nassert.getObjectId(),
        name: 'user1',
        email: 'user1@mail.com',
      },
      {
        _id: nassert.getObjectId(),
        name: 'user2',
        email: 'user2@mail.com',
      },
      {
        _id: nassert.getObjectId(),
        name: 'user3',
        email: 'user3@mail.com',
      },
    ]

    async function test({ expectedStatus, expectedBody }: any) {
      await User.create(initialUsers)

      return request(app)
        .get('/api/users/')
        .expect(expectedStatus)
        .expect('Content-Type', /json/)
        .expect(res => nassert.assert(sortBy(res.body, 'userId'), sortBy(expectedBody, 'userId')))
    }

    it('should return status 200 and list of users', () => {
      const expectedStatus = 200
      const expectedBody = map(initialUsers, user => {
        const userCopy = cloneDeep(user) as any
        userCopy.userId = user._id // rewrite id after clone
        delete userCopy._id
        return userCopy
      })

      return test({ expectedStatus, expectedBody })
    })
  })

  describe('getUserById', () => {
    const initialUsers = [
      {
        _id: nassert.getObjectId(),
        name: 'user1',
        email: 'user1@mail.com',
      },
      {
        _id: nassert.getObjectId(),
        name: 'user2',
        email: 'user2@mail.com',
      },
      {
        _id: nassert.getObjectId(),
        name: 'user3',
        email: 'user3@mail.com',
      },
    ]

    async function test({ userId, expectedStatus, expectedBody }: any) {
      await User.create(initialUsers)

      return request(app)
        .get('/api/users/' + userId)
        .expect(expectedStatus)
        .expect('Content-Type', /json/)
        .expect(res => nassert.assert(res.body, expectedBody))
    }

    it('should return status 422 when req.params.userId is invalid', () => {
      const userId = 'Invalid Id'
      const expectedStatus = 422
      const expectedBody = {
        message: 'userId must be a valid ObjectId',
      }

      return test({ userId, expectedStatus, expectedBody })
    })

    it('should return status 404 when user is not found by req.params.userId', () => {
      const userId = nassert.getObjectId()
      const expectedStatus = 404
      const expectedBody = {
        message: 'user is not found',
      }

      return test({ userId, expectedStatus, expectedBody })
    })

    it('should return status 200 and user', () => {
      const userId = initialUsers[0]._id
      const expectedStatus = 200
      const expectedBody = cloneDeep(initialUsers[0]) as any
      expectedBody.userId = userId
      delete expectedBody._id

      return test({ userId, expectedStatus, expectedBody })
    })
  })

  describe('createUser', () => {
    const initialUsers = [
      {
        _id: nassert.getObjectId(),
        name: 'user1',
        email: 'user1@mail.com',
      },
      {
        _id: nassert.getObjectId(),
        name: 'user2',
        email: 'user2@mail.com',
      },
      {
        _id: nassert.getObjectId(),
        name: 'user3',
        email: 'user3@mail.com',
      },
    ]

    async function test({ userData, expectedStatus, expectedBody }: any) {
      await User.create(initialUsers)

      return request(app)
        .post('/api/users')
        .send(userData)
        .expect(expectedStatus)
        .expect('Content-Type', /application\/json/)
        .expect(res => nassert.assert(res.body, expectedBody))
    }

    it('should return status 422 when req.body is empty', () => {
      const userData = null
      const expectedStatus = 422
      const expectedBody = {
        message: 'name is required',
      }

      return test({ userData, expectedStatus, expectedBody })
    })

    it('should return status 422 when req.body.name is undefined', () => {
      const userData = {
        email: 'new-user@mail.com',
      }
      const expectedStatus = 422
      const expectedBody = {
        message: 'name is required',
      }

      return test({ userData, expectedStatus, expectedBody })
    })

    it('should return status 422 when req.body.email is undefined', () => {
      const userData = {
        name: 'new-user',
      }
      const expectedStatus = 422
      const expectedBody = {
        message: 'email is required',
      }

      return test({ userData, expectedStatus, expectedBody })
    })

    it('should return status 422 when req.body.email is not valid email', () => {
      const userData = {
        name: 'new-user',
        email: 'invalidEmail',
      }
      const expectedStatus = 422
      const expectedBody = {
        message: 'email must be a valid email address',
      }

      return test({ userData, expectedStatus, expectedBody })
    })

    it('should return status 200 and create a new user when req.body is valid', () => {
      const userData = {
        name: 'new-user',
        email: 'new-user@mail.com',
      }
      const expectedStatus = 201
      const expectedBody = {
        userId: '_mock_',
        name: 'new-user',
        email: 'new-user@mail.com',
      }

      return test({ userData, expectedStatus, expectedBody })
    })
  })

  describe('updateUser', () => {
    const initialUsers = [
      {
        _id: nassert.getObjectId(),
        name: 'user1',
        email: 'user1@mail.com',
      },
      {
        _id: nassert.getObjectId(),
        name: 'user2',
        email: 'user2@mail.com',
      },
      {
        _id: nassert.getObjectId(),
        name: 'user3',
        email: 'user3@mail.com',
      },
    ]

    async function test({ userId, userData, expectedStatus, expectedBody }: any) {
      await User.create(initialUsers)

      return request(app)
        .put('/api/users/' + userId)
        .send(userData)
        .expect(expectedStatus)
        .expect(res => {
          if (expectedStatus === 204) {
            should(res.headers['content-type']).is.undefined
          } else {
            should(res.headers['content-type']).match(/application\/json/)
          }
          nassert.assert(res.body, expectedBody, true)
        })
    }

    it('should return status 422 when req.params.userId is invalid', () => {
      const userId = 'InvalidId'
      const userData = {
        name: 'user1-new',
        email: 'user1-new@mail.com',
      }
      const expectedStatus = 422
      const expectedBody = {
        message: 'userId must be a valid ObjectId',
      }

      return test({ userId, userData, expectedStatus, expectedBody })
    })

    it('should return status 422 when req.body is empty', () => {
      const userId = initialUsers[0]._id
      const userData = null
      const expectedStatus = 422
      const expectedBody = {
        message: 'name is required',
      }

      return test({ userId, userData, expectedStatus, expectedBody })
    })

    it('should return status 422 when req.body.name is undefined', () => {
      const userId = initialUsers[0]._id
      const userData = {
        email: 'user1-new@mail.com',
      }
      const expectedStatus = 422
      const expectedBody = {
        message: 'name is required',
      }

      return test({ userId, userData, expectedStatus, expectedBody })
    })

    it('should return status 422 when req.body.email is undefined', () => {
      const userId = initialUsers[0]._id
      const userData = {
        name: 'user1-new',
      }
      const expectedStatus = 422
      const expectedBody = {
        message: 'email is required',
      }

      return test({ userId, userData, expectedStatus, expectedBody })
    })

    it('should return status 422 when req.body.email is not valid email', () => {
      const userId = initialUsers[0]._id
      const userData = {
        name: 'user1-new',
        email: 'invalidEmail',
      }
      const expectedStatus = 422
      const expectedBody = {
        message: 'email must be a valid email address',
      }

      return test({ userId, userData, expectedStatus, expectedBody })
    })

    it('should return status 404 when user is not found by req.params.userId', () => {
      const userId = nassert.getObjectId()
      const userData = {
        name: 'user1-new',
        email: 'user1-new@mail.com',
      }
      const expectedStatus = 404
      const expectedBody = {
        message: 'user is not found',
      }

      return test({ userId, userData, expectedStatus, expectedBody })
    })

    it('should return status 200 and update an user when req.body is valid', () => {
      const userId = initialUsers[0]._id
      const userData = {
        name: 'user1-new',
        email: 'user1-new@mail.com',
      }
      const expectedStatus = 204
      const expectedBody = {}

      return test({ userId, userData, expectedStatus, expectedBody })
    })
  })

  describe('deleteUser', () => {
    const initialUsers = [
      {
        _id: nassert.getObjectId(),
        name: 'user1',
        email: 'user1@mail.com',
      },
      {
        _id: nassert.getObjectId(),
        name: 'user2',
        email: 'user2@mail.com',
      },
      {
        _id: nassert.getObjectId(),
        name: 'user3',
        email: 'user3@mail.com',
      },
    ]

    async function test({ userId, expectedStatus, expectedBody }: any) {
      await User.create(initialUsers)

      return request(app)
        .delete('/api/users/' + userId)
        .expect(expectedStatus)
        .expect(res => {
          if (expectedStatus === 204) {
            should(res.headers['content-type']).is.undefined
          } else {
            should(res.headers['content-type']).match(/application\/json/)
          }
          nassert.assert(res.body, expectedBody, true)
        })
    }

    it('should return status 422 when req.params.userId is invalid', () => {
      const userId = 'Invalid Id'
      const expectedStatus = 422
      const expectedBody = {
        message: 'userId must be a valid ObjectId',
      }

      return test({ userId, expectedStatus, expectedBody })
    })

    it('should return status 404 when user is not found by req.params.userId', () => {
      const userId = nassert.getObjectId()
      const expectedStatus = 404
      const expectedBody = {
        message: 'user is not found',
      }

      return test({ userId, expectedStatus, expectedBody })
    })

    it('should return status 204 and delete user', () => {
      const userId = initialUsers[0]._id
      const expectedStatus = 204
      const expectedBody = {}

      return test({ userId, expectedStatus, expectedBody })
    })
  })
})
