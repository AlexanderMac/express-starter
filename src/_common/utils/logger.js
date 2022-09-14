import { map, cloneDeep } from 'lodash-es'
import winston from 'winston'

import config from '../../../config/environment/index.js'

const { combine, colorize, simple } = winston.format

const errorFormat = winston.format(info => {
  if (info.message instanceof Error) {
    info.message = info.message.stack
  }

  return info
})

export default winston.createLogger({
  exitOnError: false,
  transports: map(config.get('winston:transports'), (opts, transType) => {
    opts = cloneDeep(opts)
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
