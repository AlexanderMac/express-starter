import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import config from '../config/environment/index.js'

export default (app) => {
  app.set('views', config.get('viewsPath'))
  app.set('port', config.get('port'))

  // istanbul ignore next
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'))
  }
  app.use(helmet())
  // TODO: uncomment for favicon:
  // app.use(favicon(path.join(config.get('rootPath'), 'client', 'images', 'favicon.ico')));
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
}
