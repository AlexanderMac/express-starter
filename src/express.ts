import * as express from 'express'
import helmet from 'helmet'
import * as morgan from 'morgan'

import { NodeEnv } from './common/enums/env'
import { errorMiddleware } from './common/middlewares/error-middleware'
import { appConfig } from './config/app'
import { appRouter } from './routes'

export function createApp() {
  const app: express.Application = express()

  app.set('port', appConfig.port)
  if (appConfig.nodeEnv !== NodeEnv.test) {
    app.use(morgan('dev'))
  }
  app.use(helmet())
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: true,
    }),
  )

  app.use('/api', appRouter)

  app.use((req: express.Request, res: express.Response) => {
    res.status(404).send({ message: 'Not found' })
  })
  app.use(errorMiddleware)

  return app
}
