import { Router } from 'express'

import { usersRouter } from './users/controller'

export const appRouter: Router = Router({
  caseSensitive: true,
})

appRouter.use('/users', usersRouter)
