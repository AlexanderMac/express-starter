import { sortBy } from 'lodash'
// @ts-ignore
import * as nassert from 'n-assert'
import * as should from 'should'
import * as request from 'supertest'

import { createApp } from '../../src/express'
import { TaskDto } from '../../src/tasks/dto'
import { Task } from '../../src/tasks/model'

const app = createApp()

type TaskModel = TaskDto & {
  _id: string
}

type TaskOutput = TaskDto & {
  taskId: string
}

describe('tasks / controller', () => {
  function taskModelToTaskOutput(task: TaskModel) {
    const ret: TaskOutput = {
      taskId: task._id,
      name: task.name,
      done: task.done,
    }
    return ret
  }

  describe('getTasks', () => {
    const initialTasks: TaskModel[] = [
      {
        _id: nassert.getObjectId(),
        name: 'task1',
        done: false,
      },
      {
        _id: nassert.getObjectId(),
        name: 'task2',
        done: true,
      },
      {
        _id: nassert.getObjectId(),
        name: 'task3',
        done: true,
      },
    ]

    async function test(expectedStatus: number, expectedBody: any) {
      await Task.create(initialTasks)

      return request(app)
        .get('/api/tasks/')
        .expect(expectedStatus)
        .expect('Content-Type', /json/)
        .expect(res => nassert.assert(sortBy(res.body, 'taskId'), sortBy(expectedBody, 'taskId')))
    }

    it('should return status 200 and list of tasks', async () => {
      const expectedStatus = 200
      const expectedBody = initialTasks.map(taskModelToTaskOutput)

      await test(expectedStatus, expectedBody)
    })
  })

  describe('getTaskById', () => {
    const initialTasks: TaskModel[] = [
      {
        _id: nassert.getObjectId(),
        name: 'task1',
        done: false,
      },
      {
        _id: nassert.getObjectId(),
        name: 'task2',
        done: true,
      },
      {
        _id: nassert.getObjectId(),
        name: 'task3',
        done: true,
      },
    ]

    async function test(taskId: string, expectedStatus: number, expectedBody: any) {
      await Task.create(initialTasks)

      return request(app)
        .get('/api/tasks/' + taskId)
        .expect(expectedStatus)
        .expect('Content-Type', /json/)
        .expect(res => nassert.assert(res.body, expectedBody))
    }

    it('should return status 400 when params.taskId is invalid', async () => {
      const taskId = 'Invalid Id'
      const expectedStatus = 400
      const expectedBody = {
        message: 'params.taskId is invalid ObjectId',
      }

      await test(taskId, expectedStatus, expectedBody)
    })

    it('should return status 404 when task not found by params.taskId', async () => {
      const taskId = nassert.getObjectId()
      const expectedStatus = 404
      const expectedBody = {
        message: 'Task not found',
      }

      await test(taskId, expectedStatus, expectedBody)
    })

    it('should return status 200 and a task', async () => {
      const expectedStatus = 200
      const expectedBody = taskModelToTaskOutput(initialTasks[0])

      await test(expectedBody.taskId, expectedStatus, expectedBody)
    })
  })

  describe('createTask', () => {
    const initialTasks: TaskModel[] = [
      {
        _id: nassert.getObjectId(),
        name: 'task1',
        done: false,
      },
      {
        _id: nassert.getObjectId(),
        name: 'task2',
        done: true,
      },
      {
        _id: nassert.getObjectId(),
        name: 'task3',
        done: true,
      },
    ]

    async function test(taskData: Partial<TaskOutput> | undefined, expectedStatus: number, expectedBody: any) {
      await Task.create(initialTasks)

      return request(app)
        .post('/api/tasks')
        .send(taskData)
        .expect(expectedStatus)
        .expect('Content-Type', /application\/json/)
        .expect(res => nassert.assert(res.body, expectedBody))
    }

    it('should return status 400 when body is empty', async () => {
      const taskData = undefined
      const expectedStatus = 400
      const expectedBody = {
        message: 'body.name is required\nbody.done is required',
      }

      await test(taskData, expectedStatus, expectedBody)
    })

    it('should return status 400 when body.name is undefined', async () => {
      const taskData = {
        done: false,
      }
      const expectedStatus = 400
      const expectedBody = {
        message: 'body.name is required',
      }

      await test(taskData, expectedStatus, expectedBody)
    })

    it('should return status 400 when body.done is undefined', async () => {
      const taskData = {
        name: 'new-task',
      }
      const expectedStatus = 400
      const expectedBody = {
        message: 'body.done is required',
      }

      await test(taskData, expectedStatus, expectedBody)
    })

    it('should return status 200 and create a new task when body is valid', async () => {
      const taskData = {
        name: 'new-task',
        done: false,
      }
      const expectedStatus = 201
      const expectedBody = {
        taskId: '_mock_',
        name: 'new-task',
        done: false,
      }

      await test(taskData, expectedStatus, expectedBody)
    })
  })

  describe('updateTask', () => {
    const initialTasks: TaskModel[] = [
      {
        _id: nassert.getObjectId(),
        name: 'task1',
        done: false,
      },
      {
        _id: nassert.getObjectId(),
        name: 'task2',
        done: true,
      },
      {
        _id: nassert.getObjectId(),
        name: 'task3',
        done: true,
      },
    ]

    async function test(
      taskId: string,
      taskData: Partial<TaskOutput> | undefined,
      expectedStatus: number,
      expectedBody: any,
    ) {
      await Task.create(initialTasks)

      return request(app)
        .put('/api/tasks/' + taskId)
        .send(taskData)
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

    it('should return status 400 when params.taskId is invalid', async () => {
      const taskId = 'InvalidId'
      const taskData = {
        name: 'task1-new',
        done: false,
      }
      const expectedStatus = 400
      const expectedBody = {
        message: 'params.taskId is invalid ObjectId',
      }

      await test(taskId, taskData, expectedStatus, expectedBody)
    })

    it('should return status 400 when body is empty', async () => {
      const taskId = initialTasks[0]._id
      const taskData = undefined
      const expectedStatus = 400
      const expectedBody = {
        message: 'body.name is required\nbody.done is required',
      }

      await test(taskId, taskData, expectedStatus, expectedBody)
    })

    it('should return status 400 when body.name is undefined', async () => {
      const taskId = initialTasks[0]._id
      const taskData = {
        done: false,
      }
      const expectedStatus = 400
      const expectedBody = {
        message: 'body.name is required',
      }

      await test(taskId, taskData, expectedStatus, expectedBody)
    })

    it('should return status 400 when body.done is undefined', async () => {
      const taskId = initialTasks[0]._id
      const taskData = {
        name: 'task1-new',
      }
      const expectedStatus = 400
      const expectedBody = {
        message: 'body.done is required',
      }

      await test(taskId, taskData, expectedStatus, expectedBody)
    })

    it('should return status 404 when task not found by params.taskId', async () => {
      const taskId = nassert.getObjectId()
      const taskData = {
        name: 'task1-new',
        done: false,
      }
      const expectedStatus = 404
      const expectedBody = {
        message: 'Task not found',
      }

      await test(taskId, taskData, expectedStatus, expectedBody)
    })

    it('should return status 200 and update the task when body is valid', async () => {
      const taskId = initialTasks[0]._id
      const taskData = {
        name: 'task1-new',
        done: false,
      }
      const expectedStatus = 204
      const expectedBody = {}

      await test(taskId, taskData, expectedStatus, expectedBody)
    })
  })

  describe('deleteTask', () => {
    const initialTasks: TaskModel[] = [
      {
        _id: nassert.getObjectId(),
        name: 'task1',
        done: false,
      },
      {
        _id: nassert.getObjectId(),
        name: 'task2',
        done: true,
      },
      {
        _id: nassert.getObjectId(),
        name: 'task3',
        done: true,
      },
    ]

    async function test(taskId: string, expectedStatus: number, expectedBody: any) {
      await Task.create(initialTasks)

      return request(app)
        .delete('/api/tasks/' + taskId)
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

    it('should return status 400 when params.taskId is invalid', async () => {
      const taskId = 'Invalid Id'
      const expectedStatus = 400
      const expectedBody = {
        message: 'params.taskId is invalid ObjectId',
      }

      await test(taskId, expectedStatus, expectedBody)
    })

    it('should return status 404 when task not found by params.taskId', async () => {
      const taskId = nassert.getObjectId()
      const expectedStatus = 404
      const expectedBody = {
        message: 'Task not found',
      }

      await test(taskId, expectedStatus, expectedBody)
    })

    it('should return status 204 and delete the task', async () => {
      const taskId = initialTasks[0]._id
      const expectedStatus = 204
      const expectedBody = {}

      await test(taskId, expectedStatus, expectedBody)
    })
  })
})
