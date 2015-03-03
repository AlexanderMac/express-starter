/* global before, afterEach, after */

var Q          = require('q');
var _          = require('lodash');
var requireDir = require('require-dir');
var db         = require('../../server/util/db');
var TestError  = require('./test-error');
var models     = requireDir('../../server/models', { recurse: true });

before(function(done) {
  return db.connect(function(err) {
    if (err) { return done(new TestError(err)); }
    _clearDb(done);
  });
});

afterEach(function(done) {
  _clearDb(done);
});

after(function(done) {
  _clearDb(function(err) {
    if (err) { return done(new TestError(err)); }
    db.disconnect(done);
  });
});

function _clearDb(done) {
  var promises = _(models)
    .keys()
    .map(function(modelName) {
      var deferred = Q.defer();
      models[modelName].remove(deferred.makeNodeResolver());
      return deferred.promise;
    })
    .value();

  Q.all(promises)
    .then(function() {
      done();
    })
    .fail(done);
}
