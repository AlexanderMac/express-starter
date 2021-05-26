import express from 'express'
import config from '../config/environment/index.js'
import db from './_common/db/index.js'
import logger from './_common/utils/logger.js'

import './_common/utils/errors/index.js'
import appExpress from './express.js'
import appRoutes from './routes.js'

const app = express()
appExpress(app)
appRoutes(app)

// istanbul ignore next
if (app.get('env') !== 'test') {
  db.connect()

  app.listen(app.get('port'), () => {
    logger.info(`Express server started, environment=${config.get('env')}, listening on port=${config.get('port')}`)
  })
}

export default app
