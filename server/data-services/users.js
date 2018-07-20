'use strict';

const customErrors = require('n-custom-errors');
const User         = require('mongoose').model('user');

exports.getUser = (filter, keys) => {
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

exports.getUsers = (filter, keys) => {
  return User.find(filter, keys);
};

exports.createUser = (userData) => {
  return User.create(userData);
};

exports.saveUser = (user) => {
  return user.save();
};

exports.deleteUserById = (userId) => {
  return exports
    .getUser({ _id: userId })
    .then(user => user.remove());
};
