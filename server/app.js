'use strict';

const app = require('express')(),
      config = require('./config/config');

// Express conf
require('./config/express.config')(app);

// Mongoose conf
require('./config/mongoose.config')(config);

// Start the server
app.listen(config.dev.port, () => 
  console.log(`Server listening on Port ${config.dev.port}`)
);