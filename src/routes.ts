import { Router } from 'express'

import { tasksRouter } from './tasks/controller'

export const appRouter: Router = Router({
  caseSensitive: true,
})

appRouter.use('/tasks', tasksRouter)
