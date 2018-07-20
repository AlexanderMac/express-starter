'use strict';

const should         = require('should');
const validationUtil = require('../../../server/util/validation-util');

describe('util', () => {
  describe('validationUtil', () => {
    describe('isValidObjectId', () => {
      function test(val, expected) {
        let actual = validationUtil.isValidObjectId(val);
        should(actual).equal(expected);
      }

      it('should return false when val is undefined', () => {
        let val;
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is null', () => {
        let val = null;
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is a boolean and equals false', () => {
        let val = false;
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is a boolean and equals true', () => {
        let val = true;
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is a number and equals zero', () => {
        let val = 0;
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is a number', () => {
        let val = 123;
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is a Date object', () => {
        let val = new Date();
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is an object', () => {
        let val = {};
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is an array', () => {
        let val = [1, 2, 3];
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is an empty string', () => {
        let val = '';
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is a string with invalid id', () => {
        let val = 'invalid id';
        let expected = false;

        test(val, expected);
      });

      it('should return true when val is a string with valid id', () => {
        let val = '0123456789abcdefABCDEF00';
        let expected = true;

        test(val, expected);
      });
    });

    describe('isValidEmail', () => {
      function test(val, expected) {
        let actual = validationUtil.isValidEmail(val);
        should(actual).equal(expected);
      }

      it('should return false when val is undefined', () => {
        let val;
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is null', () => {
        let val = null;
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is a boolean and equals false', () => {
        let val = false;
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is a boolean and equals true', () => {
        let val = true;
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is a number and equals zero', () => {
        let val = 0;
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is a number', () => {
        let val = 123;
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is a Date object', () => {
        let val = new Date();
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is an object', () => {
        let val = {};
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is an array', () => {
        let val = [1, 2, 3];
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is an empty string', () => {
        let val = '';
        let expected = false;

        test(val, expected);
      });

      it('should return false when val is a string with invalid email', () => {
        let val = 'invalid email';
        let expected = false;

        test(val, expected);
      });

      it('should return true when val is a string with valid email', () => {
        let val = 'valid-email@mail.com';
        let expected = true;

        test(val, expected);
      });
    });
  });
});
