import { Application, json, urlencoded } from 'express'
import helmet from 'helmet'
import * as morgan from 'morgan'

import { appConfig } from './config/app'

export default (app: Application) => {
  app.set('port', appConfig.port)

  // istanbul ignore next
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'))
  }
  app.use(helmet())
  // TODO: uncomment for favicon:
  // app.use(favicon(path.join(config.get('rootPath'), 'client', 'images', 'favicon.ico')));
  app.use(json())
  app.use(
    urlencoded({
      extended: true,
    }),
  )
}
