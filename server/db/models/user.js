'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: String
});

var UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
