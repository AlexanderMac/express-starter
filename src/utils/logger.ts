import { cloneDeep, keys } from 'lodash'
import * as winston from 'winston'

import { appConfig } from '../config/app'

const { combine, colorize, simple } = winston.format

const errorFormat = winston.format(info => {
  if (info.stack) {
    info.message = info.stack
    info.stack = ''
  }

  return info
})

export const logger = winston.createLogger({
  exitOnError: false,
  transports: keys(appConfig.winston.transports).map(transType => {
    const opts = cloneDeep(appConfig.winston.transports[transType])
    switch (transType) {
      case 'console':
        opts.format = combine(errorFormat(), colorize(), simple())
        opts.handleExceptions = false
        opts.handleRejections = false
        return new winston.transports.Console(opts)
      default:
        throw new Error('Unknown logger transport type: ' + transType)
    }
  }),
})

export function initUnhandledErrorListeners() {
  process.on('uncaughtException', (err: any) => {
    logger.error(err, { message: 'uncaughtException' })
    setTimeout(() => process.exit(1), 1000)
  })
  process.on('unhandledRejection', (err: any) => {
    logger.error(err, { message: 'unhandledRejection' })
    setTimeout(() => process.exit(1), 1000)
  })
}
