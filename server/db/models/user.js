'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

var UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
