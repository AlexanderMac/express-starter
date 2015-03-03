var Q                     = require('q');
var DbObjectNotFoundError = require('../errors/db-object-notfound-error');
var UserModel             = require('../models/user-model');

module.exports = {
  getSingleById: function(id, keys) {
    keys = keys || ['_id'];
  
    var query = UserModel
      .findById(id)
      .select(keys.join(' '));
  
    var deferred = Q.defer();
    query.exec(function(err, userModel) {
      if (err) {
        return deferred.reject(err);
      }
      if (!userModel) {
        return deferred.reject(new DbObjectNotFoundError(UserModel.modelName));
      }
      deferred.resolve(userModel);
    });
  
    return deferred.promise;
  },

  getList: function(keys) {
    keys = keys || ['_id'];
  
    var query = UserModel
      .find({})
      .lean()
      .sort('name')
      .select(keys.join(' '));
    
    var deferred = Q.defer();
    query.exec(function(err, userModel) {
      return deferred.makeNodeResolver()(err, userModel);
    });

    return deferred.promise;
  },

  save: function(userModel) {
    var deferred = Q.defer();
    userModel.save(function(err, savedUserModel) {
      return deferred.makeNodeResolver()(err, savedUserModel);
    });
  
    return deferred.promise;
  },

  deleteSingle: function(id) {
    var deferred = Q.defer();
    UserModel.findByIdAndRemove(id, function(err, userModel) {
      if (err) {
        return deferred.reject(err);
      }
      if (!userModel) {
        return deferred.reject(new DbObjectNotFoundError(UserModel.modelName));
      }
      deferred.resolve(userModel);
    });

    return deferred.promise;
  }
};
