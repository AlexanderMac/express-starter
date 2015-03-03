module.exports = {
  test: {
    connectionString: 'mongodb://localhost:27017/express-test'
  },
  development: {
    connectionString: 'mongodb://localhost:27017/express-dev',
    options: {
      server: { 
        poolSize: 5,
        socketOptions: { 
          keepAlive: 1 
        }
      }
    }
  },
  production: {
    connectionString: 'mongodb://localhost:27017/express-prod'
  }
};