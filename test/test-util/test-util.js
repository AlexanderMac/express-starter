'use strict';

var _        = require('lodash');
var mongoose = require('mongoose');
var should   = require('should');
require('./index');

var testUtil = {
  ObjectId: mongoose.Types.ObjectId,

  addMockKeys: function(src, isSubColl) {
    var self = this;

    var dst = _.clone(src, true, function(val) {
      if (val instanceof self.ObjectId) {
        return self.ObjectId(val);
      }
    });

    if (_.isArray(dst)) {
      _.each(dst, function(item, index) {
        dst[index] = self.addMockKeys(item, true);
      });
    } else {
      var ownKeys = _.keys(dst);
      _.each(ownKeys, function(key) {
        if (_.isArray(dst[key])) {
          dst[key] = self.addMockKeys(dst[key], true);
        }
      });

      if (!isSubColl) {
        dst.__v = '_mock_';
      }
      dst.createdAt = '_mock_';
      dst.updatedAt = '_mock_';
    }

    return dst;
  },

  assert: function(actual, expected) {
    /* jshint maxcomplexity: 8 */
    var self = this;

    if (_assertIfExpectedIsUndefined(actual, expected) ||
      _assertIfExpectedIsArray(actual, expected) ||
      _assertIfExpectedIsSimplePrim(actual, expected)
    ) {
      return;
    }

    if (actual instanceof mongoose.Document) {
      actual = actual.toObject();
    }

    var expectedKeys = _.keys(expected);
    should(actual).have.properties(expectedKeys);

    _.each(expectedKeys, function(key) {
      var actualVal = actual[key];
      var expectedVal = expected[key];

      if (_.isArray(expectedVal)) {
        self.assert(actualVal, expectedVal);
        return;
      }

      if (key === '_id') {
        self.assertId(actualVal, expectedVal);
      } else if (key === '__v') {
        should(actualVal).instanceOf(Number);
      } else if (key === 'createdAt') {
        should(actualVal).instanceOf(Date);
      } else if (key === 'updatedAt') {
        should(actualVal).instanceOf(Date);
      } else if (expectedVal instanceof RegExp) {
        should(actualVal).match(expectedVal);
      } else if (expectedVal === '_mock_') {
        should(actualVal).be.ok;
      } else {
        should(actualVal).eql(expectedVal);
      }
    });
  },

  assertId: function(actual, expected) {
    if (expected === '_mock_') {
      should(actual.toString()).match(/^[a-z|\d]{24}$/);
    } else {
      should(actual.toString()).eql(expected.toString());
    }
  },

  isSimplePrim: function(prim) {
    return _.isBoolean(prim) || 
         _.isNumber(prim) ||
         _.isString(prim) ||
         _.isDate(prim);
  },

  buildQuery: function(params) {
    var query = '';
    _.each(params, function(value, key) {
      query += key + '=' + value + '&';
    });
    return _.trimRight(query, '&');
  },

  processError: function(actual, expected, done) {
    if (expected instanceof Error) {
      try {
        should(actual).eql(expected);
        done();
      } catch(err) {
        done(err);
      }
    } else {
      done(actual);
    }
  },

  resolveOrReject(err, resolve, reject) {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  }
};

function _assertIfExpectedIsUndefined(actual, expected) {
  if (!expected) {
    should(actual).not.be.ok;
    return true;
  }
  return false;
}

function _assertIfExpectedIsArray(actual, expected) {
  if (_.isArray(expected)) {
    should(actual).have.length(expected.length);
    for (var i = 0; i < expected.length; i++) {
      testUtil.assert(actual[i], expected[i]);
    }
    return true;
  }
  return false;
}

function _assertIfExpectedIsSimplePrim(actual, expected) {
  if (testUtil.isSimplePrim(expected)) {
    should(actual).eql(expected);
    return true;
  }
  return false;
}

module.exports = testUtil;
