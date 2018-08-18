const winston = require('winston');

const option = {
  handleExceptions: true,
};

module.exports = new winston.transports.Console(option);
