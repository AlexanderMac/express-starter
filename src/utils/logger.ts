import { cloneDeep, keys } from 'lodash'
import * as winston from 'winston'

import { appConfig } from '../config/app'

const { combine, colorize, simple } = winston.format

const errorFormat = winston.format(info => {
  if (info.message instanceof Error) {
    info.message = info.message.stack
  }

  return info
})

export default winston.createLogger({
  exitOnError: false,
  transports: keys(appConfig.winston.transports).map(transType => {
    const opts = cloneDeep(appConfig.winston.transports[transType])
    switch (transType) {
      case 'console':
        opts.format = combine(errorFormat(), colorize(), simple())
        return new winston.transports.Console(opts)
      default:
        throw new Error('Unknown logger transport type: ' + transType)
    }
  }),
})
