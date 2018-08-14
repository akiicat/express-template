process.env.NODE_ENV = 'test';

//Require the dev-dependencies
global.chai = require('chai');
global.chaiHttp = require('chai-http');
global.should = chai.should();
global.app = require('../app');

chai.use(chaiHttp);

require('./controllers/signals');
