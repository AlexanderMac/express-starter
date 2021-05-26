import users from './controller.js'

export default (app) => {
  app.get('/api/users/:userId', users.getUserById)
  app.get('/api/users', users.getUsers)
  app.post('/api/users', users.createUser)
  app.put('/api/users/:userId', users.updateUser)
  app.delete('/api/users/:userId', users.deleteUser)
}
