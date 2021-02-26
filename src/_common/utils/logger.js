const _ = require('lodash')
const winston = require('winston')
const config = require('../../../config/environment')

const { combine, colorize, simple } = winston.format

const errorFormat = winston.format(info => {
  if (info.message instanceof Error) {
    info.message = info.message.stack
  }

  return info
})

let logger = winston.createLogger({
  exitOnError: false,
  transports: _.map(config.get('winston:transports'), (opts, transType) => {
    opts = _.cloneDeep(opts)
    switch (transType) {
      case 'console':
        opts.format = combine(
          errorFormat(),
          colorize(),
          simple()
        )
        return new winston.transports.Console(opts)
      default:
        throw new Error('Unknown logger transport type: ' + transType)
    }
  })
})

module.exports = logger
