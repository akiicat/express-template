let express = require('express'),
  app = express(),
  routes = require('./routes'),
  logger = require('./logs/logger'),
  bodyParser = require('body-parser'); // res.body required

app.use(logger);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

app.use('/', routes);

app.listen(env.port, function() {
  console.log('Environment is ' + env.node_env);
  console.log('Server Start on port ' + env.port);
});

module.exports = app;
