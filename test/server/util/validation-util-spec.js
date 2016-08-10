'use strict';

var should         = require('should');
var validationUtil = require('../../../server/util/validation-util');

describe('util', () => {
  describe('validationUtil', () => {
    describe('isValidObjectId', () => {
      function test(val, expected) {
        var actual = validationUtil.isValidObjectId(val);
        should(actual).equal(expected);
      }

      it('should return false when val is undefined', () => {
        var val;
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is null', () => {
        var val = null;
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is a boolean and equals false', () => {
        var val = false;
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is a boolean and equals true', () => {
        var val = true;
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is a number and equals zero', () => {
        var val = 0;
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is a number', () => {
        var val = 123;
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is a Date object', () => {
        var val = new Date();
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is an object', () => {
        var val = {};
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is an array', () => {
        var val = [1, 2, 3];
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is an empty string', () => {
        var val = '';
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is a string with invalid id', () => {
        var val = 'invalid id';
        var expected = false;

        test(val, expected);
      });

      it('should return true when val is a string with valid id', () => {
        var val = '0123456789abcdefABCDEF00';
        var expected = true;

        test(val, expected);
      });
    });

    describe('isValidEmail', () => {
      function test(val, expected) {
        var actual = validationUtil.isValidEmail(val);
        should(actual).equal(expected);
      }

      it('should return false when val is undefined', () => {
        var val;
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is null', () => {
        var val = null;
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is a boolean and equals false', () => {
        var val = false;
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is a boolean and equals true', () => {
        var val = true;
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is a number and equals zero', () => {
        var val = 0;
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is a number', () => {
        var val = 123;
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is a Date object', () => {
        var val = new Date();
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is an object', () => {
        var val = {};
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is an array', () => {
        var val = [1, 2, 3];
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is an empty string', () => {
        var val = '';
        var expected = false;

        test(val, expected);
      });

      it('should return false when val is a string with invalid email', () => {
        var val = 'invalid email';
        var expected = false;

        test(val, expected);
      });

      it('should return true when val is a string with valid email', () => {
        var val = 'valid-email@mail.com';
        var expected = true;

        test(val, expected);
      });
    });
  });
});
