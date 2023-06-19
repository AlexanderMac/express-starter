export const appConfig = {
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT ?? '') ?? 3000,

  dbConnectionUrl: process.env.DB_CONNECTION_URL!,

  winston: {
    transports: parseWinstonTransports(),
  },
}

function parseWinstonTransports(): Record<string, any> {
  const transports = (process.env.WINSTON_TRANSPORTS ?? '').split(',')
  return transports.reduce((result, transportName) => {
    const transportNameUp = transportName.toUpperCase()
    return {
      [transportName]: {
        colorize: process.env[`WINSTON_${transportNameUp}_COLORIZE`] === 'true',
        stringify: process.env[`WINSTON_${transportNameUp}_STRINGIFY`] === 'true',
        prettyPrint: process.env[`WINSTON_${transportNameUp}_PRETTYPRINT`] === 'true',
        level: process.env[`WINSTON_${transportNameUp}_LEVEL`],
      },
    }
  }, {})
}
