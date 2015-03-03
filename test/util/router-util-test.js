/* global describe, it, before, beforeEach, after */
/* jshint -W030 */

var should          = require('should');
var sinon           = require('sinon');
var routerUtil      = require('../../server/util/router-util');
var errorIdentifier = require('../../server/errors/error-identifier');

describe('router-util', function() {
  
  describe('processError', function() {
    function Res() {
      var self = this;
    
      self.status = function(statusCode) {
        self.called = true;
        self.statusCode = statusCode;
        return {
          send: function(data) {
            self.data = data;
          }
        };
      };
    }
    
    function Next() {
      var self = this;
    
      self.next = function(data) {
        self.data = data;
        self.called = true;
      };
    }
  
    var isDbInvalidObjectIdErrorStub;
    var isDbObjectNotFoundErrorStub;
    var isDbObjectValidationErrorStub;
    before(function() {
      isDbInvalidObjectIdErrorStub = sinon.stub(errorIdentifier, 'isDbInvalidObjectIdError');
      isDbObjectNotFoundErrorStub = sinon.stub(errorIdentifier, 'isDbObjectNotFoundError');
      isDbObjectValidationErrorStub = sinon.stub(errorIdentifier, 'isDbObjectValidationError');
    });
  
    var res, next;
    beforeEach(function() {
      res = new Res();
      next = new Next();
      isDbInvalidObjectIdErrorStub.returns(false);
      isDbObjectNotFoundErrorStub.returns(false);
      isDbObjectValidationErrorStub.returns(false);
    });
  
    after(function() {
      isDbInvalidObjectIdErrorStub.restore();
      isDbObjectNotFoundErrorStub.restore();
      isDbObjectValidationErrorStub.restore();
    });
  
    it('should send status 422 and error message when error instanceOf DbInvalidObjectIdError', function() {
      isDbInvalidObjectIdErrorStub.returns(true);
      var err = {
        message: 'id is not valid ObjectId'
      };
      routerUtil.processError(err, res, next.next);
    
      should(res.called).be.true;
      should(res.statusCode).eql(422);
      should(res.data).eql({ message: 'id is not valid ObjectId'} );
      should(next.called).be.not.ok;
    });
  
    it('should send status 404 and error message when error instanceOf DbObjectNotFoundError', function() {
      isDbObjectNotFoundErrorStub.returns(true);
      var err = {
        message: 'model not found'
      };
      routerUtil.processError(err, res, next.next);
    
      should(res.called).be.true;
      should(res.statusCode).eql(404);
      should(res.data).eql({ message: 'model not found'} );
      should(next.called).be.not.ok;
    });
  
    it('should send status 422 and error message when error instanceOf ValidationError', function() {
      isDbObjectValidationErrorStub.returns(true);
      var err = {
        errors: 'Model ValidationError'
      };
      routerUtil.processError(err, res, next.next);
    
      should(res.called).be.true;
      should(res.statusCode).eql(422);
      should(res.data).eql({ message: 'Model ValidationError'} );
      should(next.called).be.not.ok;
    });
  });
  
});