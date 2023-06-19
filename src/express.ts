import * as bodyParser from 'body-parser';
import { Application } from 'express';
import helmet from 'helmet';
import * as morgan from 'morgan';

import { get } from '../config/environment';

export default (app: Application) => {
  app.set('views', get('viewsPath'));
  app.set('port', get('port'));

  // istanbul ignore next
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }
  app.use(helmet());
  // TODO: uncomment for favicon:
  // app.use(favicon(path.join(config.get('rootPath'), 'client', 'images', 'favicon.ico')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
};
