var mongoose = require('mongoose');
var configs  = require('../../config/mongo.js');
require('colors');

var config;
if (process.env.NODE_ENV === 'production') {
  config = configs.production;
} else if (process.env.NODE_ENV === 'test') {
  config = configs.test;
} else {
  config = configs.development;
}
console.log('[db]', 'Using database:', config.connectionString.green);

var conn = mongoose.connection;
conn.on('error', function(err) {
  console.log('\n', '[db]', 'Database connection error'.red, err);
});

conn.on('connected', function () {
  console.log('\n', '[db]', 'Connected to database'.green);
});

conn.on('disconnected', function () {
  console.log('\n', '[db]', 'Disconnected from database'.green);
});

module.exports = {
  conn: conn,
  
  connect: function(cb) {
    mongoose.connect(config.connectionString, config.options || {}, cb);
  },
  
  disconnect: function(cb) {
    conn.close(cb);
  }
};
