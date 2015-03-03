var _             = require('lodash');
var gulp          = require('gulp');
var browserify    = require('browserify');
var watchify      = require('watchify');
var source        = require('vinyl-source-stream');
var bundleLogger  = require('./util/bundleLogger');
var handleErrors  = require('./util/handleErrors');
var args          = require('../config/gulp').args;
var config        = require('../config/gulp').browserify;

gulp.task('browserify', ['bobr'], function(cb) {
  var bundleCount = config.bundles.length;
  
  var makeBundle = function(bundleConfig) {
    var bundler = browserify({
      debug: config.debug,
      entries: bundleConfig.entries,
      noParse: config.noParse
    });

    if (bundleConfig.required) {
      _.each(bundleConfig.required, function(moduleName) {
        bundler.require(moduleName, module.expose);
      });
    }
    
    _resolveExternalBundlesConfig(bundleConfig);
    if (bundleConfig.externals) {
      _.each(bundleConfig.externals, function(moduleName) {
        bundler.external(moduleName, module.expose);
      });
    }
    
    var bundle = function() {
      bundleLogger.start(bundleConfig.outputName, args.isOnlyWatching && bundleConfig.isWatching);
      return bundler
        .bundle()
        .on('error', handleErrors)
        .pipe(source(bundleConfig.outputName))
        .pipe(gulp.dest(bundleConfig.dest))
        .on('end', reportFinished);
    };

    if (args.isOnlyWatching && bundleConfig.isWatching) {
      bundler = watchify(bundler);
      bundler.on('update', bundle);
    }
    
    var reportFinished = function() {
      bundleLogger.end(bundleConfig.outputName, bundleConfig.dest);
      if(bundleCount) {
        bundleCount--;
        if(bundleCount === 0) {
          cb();
        }
      }
    };
    
    return bundle();
  };

  _.each(config.bundles, makeBundle);
});

function _resolveExternalBundlesConfig(bundleConfig) {
  if (bundleConfig.externalBundles) {
    _.each(bundleConfig.externalBundles, function(bundleName) {
      var modules = _getBundleModules(bundleName);
      if (!bundleConfig.externals) {
        bundleConfig.externals = [];
      }
      bundleConfig.externals = bundleConfig.externals.concat(modules);
    });
  }
}

function _getBundleModules(bundleName) {
  var bundle = _.filter(config.bundles, function(bundle) {
    return bundle.outputName === bundleName;
  });
  return bundle.length > 0 ? bundle[0].required : []; // TODO: throw ex
}
