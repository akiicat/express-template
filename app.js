global.env = {root: __dirname};

require('./config/env');

let initializersPath = env.root + '/config/initializers/';
require('fs')
  .readdirSync(initializersPath)
  .forEach(function(file) {
    if (file.match(/\.js$/) !== null) {
      require(initializersPath + file);
    }
  });

require('./config/database');

let app = require('./config/application');

module.exports = app;
