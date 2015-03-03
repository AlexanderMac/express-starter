/* global describe, it */
/* jshint -W030 */

var errorIdentifier        = require('../../server/errors/error-identifier');
var DbObjectNotFoundError  = require('../../server/errors/db-object-notfound-error');
var DbInvalidObjectIdError = require('../../server/errors/db-invalid-objectid-error');

describe('error-identifier', function() {
  
  describe('isDbInvalidObjectIdError', function() {
    it('should return true when error is instance of DbInvalidObjectIdError', function() {
      var err = new DbInvalidObjectIdError('invalid id');
      errorIdentifier.isDbInvalidObjectIdError(err).should.be.true;
    });
    
    it('should return false when error isn\'t instance of DbInvalidObjectIdError', function() {
      var err = new Error('error message');
      errorIdentifier.isDbInvalidObjectIdError(err).should.be.false;
    });
  });
  
  describe('isDbObjectNotFoundError', function() {
    it('should return true when error is instance of DbObjectNotFoundError', function() {
      var err = new DbObjectNotFoundError('error message');
      errorIdentifier.isDbObjectNotFoundError(err).should.be.true;
    });
    
    it('should return false when error isn\'t instance of DbObjectNotFoundError', function() {
      var err = new Error('error message');
      errorIdentifier.isDbObjectNotFoundError(err).should.be.false;
    });
  });
  
  describe('isDbObjectValidationError', function() {
    it('should return true when error is instance of DbObjectValidationError', function() {
      var err = new Error('error message');
      err.name = 'ValidationError';
      errorIdentifier.isDbObjectValidationError(err).should.be.true;
    });
    
    it('should return false when error isn\'t instance of DbObjectValidationError', function() {
      var err = new Error('error message');
      errorIdentifier.isDbObjectValidationError(err).should.be.false;
    });
  });
  
});
