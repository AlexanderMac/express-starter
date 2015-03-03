/* jshint -W030 */

var _          = require('lodash');
var mongoose   = require('mongoose');
var should     = require('should');
var Q          = require('q');

var testUtil = {
  ObjectId: mongoose.Types.ObjectId,
  
  save: function(modelType, models) {
    var deferred = Q.defer();
    modelType.create(models, deferred.makeNodeResolver());
    
    return deferred.promise;
  },
  
  getList: function(modelType, sortKey, selectKeys) {
    var query = modelType.find({});
    if (sortKey) {
      query.sort(sortKey);
    }
    if (selectKeys) {
      query.select(selectKeys);
    }
    
    var deferred = Q.defer();
    query.exec(deferred.makeNodeResolver());
    
    return deferred.promise;
  },
  
  getSingleById: function(modelType, id) {
    var deferred = Q.defer();
    modelType.findById(id, deferred.makeNodeResolver());
    
    return deferred.promise;
  },
  
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
        dst.__v = 'mock';
      }
      dst.createdAt = 'mock';
      dst.updatedAt = 'mock';
    }
    
    return dst;
  },
  
  assert: function(actual, expected) {
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
    actual.should.have.keys(expectedKeys);
    
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
      } else {
        should(actualVal).eql(expectedVal);
      }
    });
  },
  
  assertId: function(actual, expected) {
    if (expected === 'mock') {
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
    actual.should.have.length(expected.length);
    for (var i = 0; i < expected.length; i++) {
      testUtil.assert(actual[i], expected[i]);
    }
    return true;
  }
  
  return false;
}

function _assertIfExpectedIsSimplePrim(actual, expected) {
  if (testUtil.isSimplePrim(expected)) {
    actual.should.eql(expected);
    return true;
  }
  
  return false;
}

module.exports = testUtil;
