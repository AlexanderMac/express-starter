'use strict';

var mongoose   = require('mongoose');
var Promise    = require('bluebird');
var requireDir = require('require-dir');
var config     = require('../../config/environment');
var log        = require('../util/logger').logger;

mongoose.Promise = Promise;
mongoose.models = {};

requireDir('./models');

var connection = mongoose.connection;

if (process.env.NODE_ENV !== 'test') {
    connection.on('error', err => {
        log.info('Database connection error', err);
    });

    connection.on('connected', () => {
        log.info('Connected to database: ' + config.get('db'));
    });

    connection.on('disconnected', () => {
        log.info('Disconnected from database');
    });
}

exports.connection = connection;

exports.connect = function() {
    var open = Promise.promisify(connection.open, { context: connection });
    return open(config.get('db'));
};

exports.disconnect = function() {
    var close = Promise.promisify(connection.close, { context: connection });
    return close();
};
