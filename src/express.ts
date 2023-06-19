import * as express from 'express'
import helmet from 'helmet'
import * as morgan from 'morgan'

import { NodeEnv } from './common/enums/env'
import { appConfig } from './config/app'
import routes from './routes'

export function createApp() {
  const app: express.Application = express()

  app.set('port', appConfig.port)
  // istanbul ignore next
  if (appConfig.nodeEnv !== NodeEnv.test) {
    app.use(morgan('dev'))
  }
  app.use(helmet())
  // TODO: uncomment for favicon:
  // app.use(favicon(path.join(config.get('rootPath'), 'client', 'images', 'favicon.ico')));
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: true,
    }),
  )

  routes(app)

  return app
}
