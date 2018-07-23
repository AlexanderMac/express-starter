'use strict';

const customErrors = require('n-custom-errors');
const paramsProc   = require('n-params-processor');

customErrors.predefined.http.register();

paramsProc.registerCustomErrorType(customErrors.getUnprocessableRequestErrorType());
