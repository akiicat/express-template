let node_env = process.env.NODE_ENV || 'staging';
let root = __dirname;

// convert environment variable to global object
global.env = {
  node_env: node_env,
  root: root,
  ...require('./config/environments/' + node_env),
};

global._ = require('lodash');
let db = require('./config/database');
let app = require('./config/application');

module.exports = app;
