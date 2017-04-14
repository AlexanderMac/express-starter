'use strict';

var _ = require('lodash');

module.exports = {
  isValidObjectId: function(val) {
    var regexp = /^[0-9a-fA-F]{24}$/;
    return _.isString(val) && regexp.test(val);
  },
  isValidEmail: function(val) {
    var regexp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return _.isString(val) && regexp.test(val);
  }
};
