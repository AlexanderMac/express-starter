import { sortBy } from 'lodash'
// @ts-ignore
import * as nassert from 'n-assert'
import * as should from 'should'
import * as request from 'supertest'

import { createApp } from '../../src/express'
import { UserDto } from '../../src/users/dto'
import { User } from '../../src/users/model'

const app = createApp()

type UserModel = UserDto & {
  _id: string
}

type UserOutput = UserDto & {
  userId: string
}

describe('users / controller', () => {
  function userModelToUserOutput(user: UserModel) {
    const ret: UserOutput = {
      userId: user._id,
      name: user.name,
      email: user.email,
    }
    return ret
  }

  describe('getUsers', () => {
    const initialUsers: UserModel[] = [
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

    async function test(expectedStatus: number, expectedBody: any) {
      await User.create(initialUsers)

      return request(app)
        .get('/api/users/')
        .expect(expectedStatus)
        .expect('Content-Type', /json/)
        .expect(res => nassert.assert(sortBy(res.body, 'userId'), sortBy(expectedBody, 'userId')))
    }

    it('should return status 200 and list of users', async () => {
      const expectedStatus = 200
      const expectedBody = initialUsers.map(userModelToUserOutput)

      await test(expectedStatus, expectedBody)
    })
  })

  describe('getUserById', () => {
    const initialUsers: UserModel[] = [
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

    async function test(userId: string, expectedStatus: number, expectedBody: any) {
      await User.create(initialUsers)

      return request(app)
        .get('/api/users/' + userId)
        .expect(expectedStatus)
        .expect('Content-Type', /json/)
        .expect(res => nassert.assert(res.body, expectedBody))
    }

    it('should return status 400 when params.userId is invalid', async () => {
      const userId = 'Invalid Id'
      const expectedStatus = 400
      const expectedBody = {
        message: 'params.userId is invalid ObjectId',
      }

      await test(userId, expectedStatus, expectedBody)
    })

    it('should return status 404 when user not found by params.userId', async () => {
      const userId = nassert.getObjectId()
      const expectedStatus = 404
      const expectedBody = {
        message: 'User not found',
      }

      await test(userId, expectedStatus, expectedBody)
    })

    it('should return status 200 and a user', async () => {
      const expectedStatus = 200
      const expectedBody = userModelToUserOutput(initialUsers[0])

      await test(expectedBody.userId, expectedStatus, expectedBody)
    })
  })

  describe('createUser', () => {
    const initialUsers: UserModel[] = [
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

    async function test(userData: Partial<UserOutput> | undefined, expectedStatus: number, expectedBody: any) {
      await User.create(initialUsers)

      return request(app)
        .post('/api/users')
        .send(userData)
        .expect(expectedStatus)
        .expect('Content-Type', /application\/json/)
        .expect(res => nassert.assert(res.body, expectedBody))
    }

    it('should return status 400 when body is empty', async () => {
      const userData = undefined
      const expectedStatus = 400
      const expectedBody = {
        message: 'body.name is required\nbody.email is required',
      }

      await test(userData, expectedStatus, expectedBody)
    })

    it('should return status 400 when body.name is undefined', async () => {
      const userData = {
        email: 'new-user@mail.com',
      }
      const expectedStatus = 400
      const expectedBody = {
        message: 'body.name is required',
      }

      await test(userData, expectedStatus, expectedBody)
    })

    it('should return status 400 when body.email is undefined', async () => {
      const userData = {
        name: 'new-user',
      }
      const expectedStatus = 400
      const expectedBody = {
        message: 'body.email is required',
      }

      await test(userData, expectedStatus, expectedBody)
    })

    it('should return status 400 when body.email is not valid email', async () => {
      const userData = {
        name: 'new-user',
        email: 'invalidEmail',
      }
      const expectedStatus = 400
      const expectedBody = {
        message: 'body.email is invalid email',
      }

      await test(userData, expectedStatus, expectedBody)
    })

    it('should return status 200 and create a new user when body is valid', async () => {
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

      await test(userData, expectedStatus, expectedBody)
    })
  })

  describe('updateUser', () => {
    const initialUsers: UserModel[] = [
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

    async function test(
      userId: string,
      userData: Partial<UserOutput> | undefined,
      expectedStatus: number,
      expectedBody: any,
    ) {
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

    it('should return status 400 when params.userId is invalid', async () => {
      const userId = 'InvalidId'
      const userData = {
        name: 'user1-new',
        email: 'user1-new@mail.com',
      }
      const expectedStatus = 400
      const expectedBody = {
        message: 'params.userId is invalid ObjectId',
      }

      await test(userId, userData, expectedStatus, expectedBody)
    })

    it('should return status 400 when body is empty', async () => {
      const userId = initialUsers[0]._id
      const userData = undefined
      const expectedStatus = 400
      const expectedBody = {
        message: 'body.name is required\nbody.email is required',
      }

      await test(userId, userData, expectedStatus, expectedBody)
    })

    it('should return status 400 when body.name is undefined', async () => {
      const userId = initialUsers[0]._id
      const userData = {
        email: 'user1-new@mail.com',
      }
      const expectedStatus = 400
      const expectedBody = {
        message: 'body.name is required',
      }

      await test(userId, userData, expectedStatus, expectedBody)
    })

    it('should return status 400 when body.email is undefined', async () => {
      const userId = initialUsers[0]._id
      const userData = {
        name: 'user1-new',
      }
      const expectedStatus = 400
      const expectedBody = {
        message: 'body.email is required',
      }

      await test(userId, userData, expectedStatus, expectedBody)
    })

    it('should return status 400 when body.email is not valid email', async () => {
      const userId = initialUsers[0]._id
      const userData = {
        name: 'user1-new',
        email: 'invalidEmail',
      }
      const expectedStatus = 400
      const expectedBody = {
        message: 'body.email is invalid email',
      }

      await test(userId, userData, expectedStatus, expectedBody)
    })

    it('should return status 404 when user not found by params.userId', async () => {
      const userId = nassert.getObjectId()
      const userData = {
        name: 'user1-new',
        email: 'user1-new@mail.com',
      }
      const expectedStatus = 404
      const expectedBody = {
        message: 'User not found',
      }

      await test(userId, userData, expectedStatus, expectedBody)
    })

    it('should return status 200 and update the user when body is valid', async () => {
      const userId = initialUsers[0]._id
      const userData = {
        name: 'user1-new',
        email: 'user1-new@mail.com',
      }
      const expectedStatus = 204
      const expectedBody = {}

      await test(userId, userData, expectedStatus, expectedBody)
    })
  })

  describe('deleteUser', () => {
    const initialUsers: UserModel[] = [
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

    async function test(userId: string, expectedStatus: number, expectedBody: any) {
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

    it('should return status 400 when params.userId is invalid', async () => {
      const userId = 'Invalid Id'
      const expectedStatus = 400
      const expectedBody = {
        message: 'params.userId is invalid ObjectId',
      }

      await test(userId, expectedStatus, expectedBody)
    })

    it('should return status 404 when user not found by params.userId', async () => {
      const userId = nassert.getObjectId()
      const expectedStatus = 404
      const expectedBody = {
        message: 'User not found',
      }

      await test(userId, expectedStatus, expectedBody)
    })

    it('should return status 204 and delete the user', async () => {
      const userId = initialUsers[0]._id
      const expectedStatus = 204
      const expectedBody = {}

      await test(userId, expectedStatus, expectedBody)
    })
  })
})
