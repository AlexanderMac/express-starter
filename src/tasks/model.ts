import { model, Schema } from 'mongoose'

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
})

taskSchema.set('toJSON', {
  transform: function (doc, task) {
    task.taskId = task._id
    delete task._id
    delete task.__v
  },
})

export const Task = model('Task', taskSchema)
