'use strict';

const users = require('../controllers/users');

module.exports = (app) => {
  app.get('/api/users/:_id', users.getUserById);
  app.get('/api/users', users.getUsers);
  app.post('/api/users', users.createUser);
  app.put('/api/users/:_id', users.updateUser);
  app.delete('/api/users/:_id', users.deleteUser);
};
