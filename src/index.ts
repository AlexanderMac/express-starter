import './_common/utils/errors'

import * as express from 'express'

import { get } from '../config/environment'
import db from './_common/db'
import logger from './_common/utils/logger'
import appExpress from './express'
import appRoutes from './routes'

export let app: express.Application

;(async () => {
  try {
    app = express()
    appExpress(app)
    appRoutes(app)

    // istanbul ignore next
    if (app.get('env') !== 'test') {
      await db.connect()

      app.listen(app.get('port'), () => {
        logger.info(`Express server started, environment=${get('env')}, listening on port=${get('port')}`)
      })
    }
  } catch (err: any) {
    logger.error(err)
  }
})()
