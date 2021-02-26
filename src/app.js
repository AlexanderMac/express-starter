const express = require('express')
const config = require('../config/environment')
const db = require('./_common/db')
const logger = require('./_common/utils/logger')

require('./_common/utils/errors')

const app = express()
require('./express')(app)
require('./routes')(app)

// istanbul ignore next
if (app.get('env') !== 'test') {
  db.connect()

  app.listen(app.get('port'), () => {
    logger.info(`Express server started, environment=${config.get('env')}, listening on port=${config.get('port')}`)
  })
}

module.exports = app
