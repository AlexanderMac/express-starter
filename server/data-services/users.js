'use strict';

var customErrors = require('n-custom-errors');
var User         = require('mongoose').model('user');

exports.getUser = function(filter, keys) {
  return User
    .findOne(filter)
    .select(keys)
    .exec()
    .then(user => {
      if (!user) {
        return customErrors.rejectWithObjectNotFoundError('user');
      }
      return user;
    });
};

exports.getUsers = function(filter, keys) {
  return User.find(filter, keys);
};

exports.createUser = function(userData) {
  return User.create(userData);
};

exports.saveUser = function(user) {
  return user.save();
};

exports.deleteUserById = function(userId) {
  return exports
    .getUser(userId)
    .then(user => user.delete());
};
