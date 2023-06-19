import { config } from 'dotenv'
import { resolve } from 'path'

import { NodeEnv } from './src/common/enums/env'

function loadEnvConfig(env: string) {
  const envPath = resolve(__dirname, process.env.ROOT || '', env)
  try {
    const { error } = config({ path: envPath, override: true })
    if (error) {
      throw error
    }
  } catch (err: any) {
    if (err.code !== 'ENOENT') {
      throw err
    }
  }
}

if (process.env.NODE_ENV !== NodeEnv.production) {
  let nodeEnv = process.env.NODE_ENV
  loadEnvConfig('.env')
  // need that because the app can be started without NODE_ENV
  if (!nodeEnv) {
    nodeEnv = process.env.NODE_ENV
  }
  switch (nodeEnv) {
    case NodeEnv.test:
      loadEnvConfig('.env.test')
      break
    case NodeEnv.development:
      loadEnvConfig('.env.dev')
      break
    case NodeEnv.staging:
      loadEnvConfig('.env.stag')
      break
    case NodeEnv.production:
      loadEnvConfig('.env.prd')
      break
  }
}
