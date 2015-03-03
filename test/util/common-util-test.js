/* global describe, it, before, afterEach, after */
/* jshint -W030 */

var should                = require('should');
var sinon                 = require('sinon');
var commonUtil            = require('../../server/util/common-util');
var DbInvalidOjectIdError = require('../../server/errors/db-invalid-objectid-error');

describe('common-util', function() {
  
  describe('isValidObjectId', function() {
    it('should return false when id is null', function() {
      var actual = commonUtil.isValidObjectId(null);
      actual.should.be.false;
    });

    it('should return false when id is invalid ObjectId', function() {
      var actual = commonUtil.isValidObjectId('123');
      actual.should.be.false;
    });

    it('should return true when id is valid ObjectId', function() {
      var actual = commonUtil.isValidObjectId('123456789abcdef111111111');
      actual.should.be.true;
    });
  });

  describe('validateObjectId', function() {
    var isValidObjectIdStub;
    
    before(function() {
      isValidObjectIdStub = sinon.stub(commonUtil, 'isValidObjectId');
    });
    
    afterEach(function() {
      isValidObjectIdStub.reset();
    });
    
    after(function() {
      isValidObjectIdStub.restore();
    });
    
    function test(id, isErrorExpected, done) {
      commonUtil
        .validateObjectId(id)
        .then(function(data) {
          isErrorExpected.should.false;
          data.should.true;
        }, function(err) {
          isErrorExpected.should.true;
          err.should.instanceOf(DbInvalidOjectIdError);
        })
        .fail(function(err) {
          throw err;
        })
        .done(function() {
          should(isValidObjectIdStub.calledWith(id)).true;
          should(isValidObjectIdStub.calledOnce).true;
          done();
        });
    }
    
    it('should resolve true when id is valid', function(done) {
      isValidObjectIdStub.returns(true);
      
      test(1, false, done);
    });
    
    it('should reject with DbInvalidOjectIdError when id is invalid', function(done) {
      isValidObjectIdStub.returns(false);
      
      test(1, true, done);
    });
  });
  
});
