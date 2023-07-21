import { extend } from 'lodash'

import { ObjectNotFoundError } from '../common/errors/object-not-found'
import { TaskDto } from './dto'
import { Task } from './model'

export async function getTaskById(taskId: string, fields?: string[]) {
  const task = await Task.findOne({ _id: taskId }, fields)
  if (task) {
    return task
  }
  throw new ObjectNotFoundError('Task not found')
}

export function getAllTasks(fields?: string[]) {
  return Task.find({}, fields)
}

export function createTask(taskData: TaskDto) {
  return Task.create(taskData)
}

export async function updateTask(taskId: string, taskData: TaskDto) {
  const task = await getTaskById(taskId)
  extend(task, taskData)

  return task.save()
}

export async function deleteTaskById(taskId: string) {
  const task = await getTaskById(taskId)
  return task.deleteOne()
}
