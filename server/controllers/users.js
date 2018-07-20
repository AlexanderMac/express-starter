'use strict';

const _              = require('lodash');
const customErrors   = require('n-custom-errors');
const usersSrvc      = require('../data-services/users');
const validationUtil = require('../util/validation-util');

exports.getUsers = function(req, res, next) {
  usersSrvc
    .getUsers({}, 'name email')
    .then(users => res.send(users))
    .catch(next);
};

exports.getUserById = function(req, res, next) {
  let userId = req.params._id;

  function validateParams() {
    if (!validationUtil.isValidObjectId(userId)) {
      customErrors.throwUnprocessableRequestError({ paramName: 'id', errMsg: 'must be a valid id' });
    }
    return Promise.resolve();
  }

  validateParams()
    .then(() => usersSrvc.getUser({ _id: userId }, 'name email'))
    .then(user => res.send(user))
    .catch(next);
};

exports.createUser = function(req, res, next) {
  function parseParams() {
    let allowedFields = ['name', 'email'];
    let userData = _.pick(req.body, allowedFields);
    return Promise.resolve(userData);
  }

  function validateParams(userData) {
    if (!userData.name) {
      customErrors.throwUnprocessableRequestError({
        paramName: 'name',
        errMsg: 'is required'
      });
    }
    if (!validationUtil.isValidEmail(userData.email)) {
      customErrors.throwUnprocessableRequestError({
        paramName: 'email',
        errMsg: 'is required and must be a valid email'
      });
    }
    return userData;
  }

  function doEdits(userData) {
    let user = _.assign({}, userData);
    return user;
  }

  parseParams()
    .then(validateParams)
    .then(doEdits)
    .then(user => usersSrvc.createUser(user))
    .then(user => res.send(user))
    .catch(next);
};

exports.updateUser = function(req, res, next) {
  function parseParams() {
    let allowedFields = ['name', 'email'];
    let userData = _.pick(req.body, allowedFields);
    userData._id = req.params._id;
    return Promise.resolve(userData);
  }

  function validateParams(userData) {
    if (!validationUtil.isValidObjectId(userData._id)) {
      customErrors.throwUnprocessableRequestError({
        paramName: 'id',
        errMsg: 'must be a valid id'
      });
    }
    if (!userData.name) {
      customErrors.throwUnprocessableRequestError({
        paramName: 'name',
        errMsg: 'is required'
      });
    }
    if (!validationUtil.isValidEmail(userData.email)) {
      customErrors.throwUnprocessableRequestError({
        paramName: 'email',
        errMsg: 'is required and must be a valid email'
      });
    }
    return userData;
  }

  function doEdits(data) {
    _.extend(data.user, data.userData);
    return data.user;
  }

  parseParams()
    .then(validateParams)
    .then(userData => usersSrvc
      .getUser({ _id: userData._id })
      .then(user => {
        return { user, userData };
      })
    )
    .then(doEdits)
    .then(user => usersSrvc.saveUser(user))
    .then(user => res.send(user))
    .catch(next);
};

exports.deleteUser = function(req, res, next) {
  let userId = req.params._id;

  function validateParams() {
    if (!validationUtil.isValidObjectId(userId)) {
      customErrors.throwUnprocessableRequestError({ paramName: 'id', errMsg: 'must be a valid id' });
    }
    return Promise.resolve();
  }

  validateParams()
    .then(() => usersSrvc.deleteUserById(userId))
    .then(() => res.status(203).end())
    .catch(next);
};
