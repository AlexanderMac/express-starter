var _           = require('lodash');
var router      = require('express').Router();
var UserModel   = require('../models/user-model');
var userSrv     = require('../services/user-service');
var routerUtil  = require('../util/router-util');
var commonUtil  = require('../util/common-util');

router.get('/users', function(req, res, next) {
  userSrv
    .getList(['name', 'email'])
    .then(function(userModels) {
      res.render('users/index', { title: 'Users list', users: userModels });
    })
    .fail(function(err) {
      routerUtil.processError(err, res, next);
    });
});

router.get('/users/new', function(req, res) {
  res.render('users/create', { title: 'Create user', user: {} });
});

router.post('/users', function(req, res, next) {
  var user = _.pick(req.body, ['name', 'email']);
  var userModel = new UserModel(user);
  
  userSrv
    .save(userModel)
    .then(function() {
      res.redirect('/users'); // TODO: add notice or alert
    })
    .fail(function(err) {
      routerUtil.processError(err, res, next);
    });
});

router.get('/users/:id/edit', function(req, res, next) {
  var userId = req.params.id;
  
  commonUtil
    .validateObjectId(userId)
    .then(function() {
      return userSrv.getSingleById(userId);
    })
    .then(function(userModel) {
      res.render('users/edit', { title: 'Edit user', user: userModel });
    })
    .fail(function(err) {
      routerUtil.processError(err, res, next);
    });
});

router.put('/users/:id', function(req, res, next) {
  var userId = req.params.id;
  var user = _.pick(req.body, ['name', 'email']);

  commonUtil
    .validateObjectId(userId)
    .then(function() {
      return userSrv.getSingleById(userId);
    })
    .then(function(userModel) {
      userModel.name = user.name;
      userModel.email = user.email;
      return userSrv.save(userModel);
    })  
    .then(function(userModel) {
      res.render('users/edit', { title: 'Edit user', user: userModel }); // TODO: add notice or alert
    })
    .fail(function(err) {
      routerUtil.processError(err, res, next);
    });
});

router.delete('/users/:id', function(req, res, next) {
  var userId = req.params.id;
  
  commonUtil
    .validateObjectId(userId)
    .then(function() {
      return userSrv.deleteSingle(userId);
    })
    .then(function() {
      res.redirect('/users'); // TODO: add notice or alert
    })
    .fail(function(err) {
      routerUtil.processError(err, res, next);
    });
});

module.exports = router;
