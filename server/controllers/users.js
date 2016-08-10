'use strict';

var _              = require('lodash');
var Promise        = require('bluebird');
var customErrors   = require('n-custom-errors');
var userSrvc       = require('../data-services/users');
var validationUtil = require('../util/validation-util');

// TODO: test it
exports.getUsers = function(req, res, next) {
  userSrvc
    .getUsers({}, 'name email')
    .then(users => res.send(users))
    .catch(next);
};

// TODO: test it
exports.getUserById = function(req, res, next) {
  var userId = req.params.id;

  function validateParams() {
    if (!validationUtil.isValidObjectId(userId)) {
      return customErrors.rejectWithUnprocessableRequestError({ paramName: 'id', errMsg: 'must be a valid id'});
    }
    return Promise.resolve();
  }

  validateParams()
    .then(() => userSrvc.getUser({ _id: userId }, 'name email'))
    .then(user => res.send(user))
    .catch(next);
};

// TODO: test it
exports.createUser = function(req, res, next) {
  var userData = _.pick(req.body, ['name', 'email']);

  // TODO: parse params
  // TODO: validate params
  
  userSrvc
    .save(userData)
    .then(user => res.send(user))
    .catch(next);
};

// TODO: test it
exports.updateUser = function(req, res, next) {
  var userId = req.params.id;
  var userData = _.pick(req.body, ['name', 'email']);

  // TODO: parse params
  // TODO: validate params

  validationUtil
    .validateObjectId(userId)
    .then(() => userSrvc.getUser({ _id: userId }))
    .then(user => {
      user.name = userData.name;
      user.email = userData.email;
      return userSrvc.save(user);
    })  
    .then(user => res.send(user))
    .catch(next);
};

// TODO: test it
exports.deleteUser = function(req, res, next) {
  var userId = req.params.id;

  // TODO: validate params
  
  function validateParams() {
    if (!validationUtil.isValidObjectId(userId)) {
      return customErrors.rejectWithUnprocessableRequestError({ paramName: 'id', errMsg: 'must be a valid id'});
    }
    return Promise.resolve();
  }

  validateParams()
    .then(() => userSrvc.deleteUserById(userId))
    .then(() => res.status(203).end())
    .catch(next);
};
