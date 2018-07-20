'use strict';

var customErrors = require('n-custom-errors');

customErrors.registerError('AccessDenied', 403);
customErrors.registerError('BusinessLogic', 422);
customErrors.registerError('DbValidation', 422);
customErrors.registerError('DuplicateObject', 409);
customErrors.registerError('ObjectNotFound', 404, '${objectName} is not found');
customErrors.registerError('ThirdPartyService', 423, '${srvcErr}. ${errMsg}');
customErrors.registerError('UnauthorizedRequest', 401);
customErrors.registerError('UnprocessableRequest', 422, '${paramName} ${errMsg}');
