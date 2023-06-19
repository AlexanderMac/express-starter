import { Application, NextFunction, Request, Response } from 'express'
import * as paramsProc from 'n-params-processor'

import userRoutes from './users/routes'
import logger from './utils/logger'

export default (app: Application) => {
  userRoutes(app)

  app.use((req: Request, res: Response) => {
    res.status(404).send({ message: 'Invalid end point' })
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof paramsProc.ParamsProcessorError) {
      return res.status(422).send({ message: err.message })
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
  })
}
