let node_env = process.env.NODE_ENV || 'staging';

// convert environment variable to global object
global.env = {
  node_env: node_env,
  ...require('./environments/' + node_env),
  ...env,
};
