var _    = require('lodash');
var argv = require('yargs').argv;

var SERVER      = './server/';
var TEST        = './test/';
var CONFIG      = './config/';
var CLIENT      = './client/';
var CLIENT_JS   = CLIENT + 'js/';
var CLIENT_CSS  = CLIENT + 'css/';
var ASSETS      = './public/assets/';
var JS_ASSETS   = ASSETS + 'js/';
var CSS_ASSETS  = ASSETS + 'css/';
var FONT_ASSETS = ASSETS + 'fonts/';

var config = {
  args: {
    isProduction: argv.production === true,
    isOnlyWatching: argv.watch === true
  },
  
  filters: {
    jsDeep: '**/*.js',
    cssDeep: '**/*.css',
    css: '*.css',
    fonts: '**/glyphicons-*'
  },
  
  paths: {
    server: SERVER,
    test: TEST,
    config: CONFIG,
    client: CLIENT,
    clientJs: CLIENT_JS,
    clientCss: CLIENT_CSS,
    assets: ASSETS,
    jsAssets: JS_ASSETS,
    cssAssets: CSS_ASSETS,
    fontAssets: FONT_ASSETS
  }
};

var taskConfigs = {
  browserify: {
    debug: !config.args.isProduction,
    noParse: [
      'jquery', 'bootstrap'
    ],
    bundles: [
      {
        required: [
          'jquery', 'bootstrap'
        ],
        dest: config.paths.jsAssets,
        outputName: 'common.ui.js'
      },
      {
        entries: config.paths.clientJs + 'app.js',
        externalBundles: [
          'common.ui.js'
        ],
        dest: config.paths.jsAssets,
        outputName: 'app.js',
        isWatching: true
      }
    ]
  },
  
  bobr: {
  },
  
  watcher: {
    watchers: [
      {
        src: [config.paths.clientCss + config.filters.css],
        tasks: ['build-app-src']
      }
    ]
  }
};

_.assign(config, taskConfigs);

module.exports = config;
