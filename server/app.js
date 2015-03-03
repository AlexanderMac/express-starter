var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var _            = require('lodash');
var logger       = require('./util/logger');
var db           = require('./util/db');
var routes       = require('./routes');
require('colors');

var root = path.normalize(__dirname + '/..');

var app = express();

app.set('views', root + '/server/views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

if (app.get('env') !== 'test') {
  app.use(logger.commonLogger);
}
// TODO: uncomment after place icon - app.use(favicon(root + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
if (app.get('env') !== 'test') {
  app.use('/assets', logger.assetsLogger);
}
app.use('/assets', express.static(root + '/public/assets'));

_.each(routes, function(route) {
  app.use(route);
});

app.use(logger.errorLogger);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error',
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

process.on('SIGINT', function() {
  console.log('[app]', 'Server is closing'.green);
  db.disconnect(function() {
    process.exit(0);
  });
});

if (app.get('env') !== 'test') {
  db.connect();

  app.set('port', process.env.PORT || 3000);
  app.listen(app.get('port'), function() {
    console.log('[app]', 'env=' + app.get('env').magenta, 'host=' + (app.get('host') || 'localhost').magenta, 'port=' + app.get('port').magenta);
  });
}

module.exports = app;
