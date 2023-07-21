import { NextFunction, Request, Response } from 'express'
import { lowerFirst } from 'lodash'
import { z } from 'zod'

import { logger } from '../utils/logger'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof z.ZodError) {
    const messages = err.errors.reduce((acc, error) => {
      acc.push(error.path.join('.') + ' is ' + lowerFirst(error.message))
      return acc
    }, [] as string[])
    return res.status(400).send({ message: messages.join('\n') })
  }
  if (err.statusCode < 500) {
    return res.status(err.statusCode).send({
      message: err.message,
      info: err.info,
    })
  }

  // istanbul ignore next
  switch (process.env.NODE_ENV) {
    case 'test':
    case 'development':
      logger.error('Unexpected server error', err, err.stack)
      break
    case 'production':
      logger.error('Unexpected server error', err)
      break
  }
  res.status(err.statusCode || 500).send({ message: 'Unexpected server error' })
}
