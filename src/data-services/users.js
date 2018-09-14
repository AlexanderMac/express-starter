'use strict';

const _          = require('lodash');
const mongoose   = require('mongoose');
const commonUtil = require('../util');

const User = mongoose.model('user');

exports.getUserOne = async ({ filter, fields }) => {
  let user = await User.findOne(filter, fields);
  return commonUtil.getObjectOrThrowError(user, 'user');
};

exports.getUserOneOrNull = async (params) => {
  try {
    let user = await exports.getUserOne(params);
    return user;
  } catch (err) {
    return commonUtil.processObjectNotFoundError(err);
  }
};

exports.getUsers = ({ filter, fields }) => {
  return User.find(filter, fields);
};

exports.createUser = ({ userData }) => {
  return User.create(userData);
};

exports.findAndUpdateUser = async ({ filter, userData }) => {
  let user = await exports.getUserOne({ filter });

  _.extend(user, userData);

  return exports.saveUser({ user });
};

exports.saveUser = ({ user }) => {
  return user.save();
};

exports.deleteUser = async (params) => {
  let user = await exports.getUserOne(params);
  return user.remove();
};
