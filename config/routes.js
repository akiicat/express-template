let express = require('express'),
  router = express.Router(),
  resources = require('./resources');

let welcome = require('../app/controllers/application.js');

router.use('/', welcome.index);

module.exports = router;
