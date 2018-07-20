'use strict';

const customErrors = require('n-custom-errors');
const User         = require('mongoose').model('user');

exports.getUser = function(filter, keys) {
  return User
    .findOne(filter)
    .select(keys)
    .exec()
    .then(user => {
      if (!user) {
        customErrors.throwObjectNotFoundError('user is not found');
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
    .getUser({ _id: userId })
    .then(user => user.remove());
};
