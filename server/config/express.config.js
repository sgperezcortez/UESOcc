'use strict';

const
  express = require('express'),
  bodyParser = require('body-parser'),
  busboyBodyParser = require('busboy-body-parser'),
  logger = require('morgan'),
  cors = require('cors'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  passport = require('passport');

module.exports = (app) => {
  app.use(logger('dev'));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(express.static(path.join(__dirname, '../../dist')));
  app.use(busboyBodyParser({limit: '10mb', multi: true}));
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Routes Configuration
  const users = require('../routes/users');
  const uploads = require('../routes/uploads');
  const careers = require('../routes/careers');
  const departments = require('../routes/departments');
  const events = require('../routes/events');
  app.use('/api/users', users);
  app.use('/api/uploads', uploads);
  app.use('/api/careers', careers);
  app.use('/api/departments', departments);
  app.use('/api/events', events);
 
  // Send all other requests to the Angular app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
  
  // Catch Error 404 and forward them to Error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // Error handler 
  app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;
    res.status(status).json({
      error: {
        message: error.message
      }
    });
  });



};