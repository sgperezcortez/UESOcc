'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = (config) => {
  let dbURI = config.dev.db;

  mongoose.connect(dbURI, {
    useMongoClient: true
  }).then(() => {
    console.log(`Connected to ${dbURI}`);
  }).catch((error) => {
    throw error;
  });

  mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
  });
}