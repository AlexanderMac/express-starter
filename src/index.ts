import * as express from 'express'

import appExpress from './express'
import appRoutes from './routes'

export const app: express.Application = express()
appExpress(app)
appRoutes(app)
