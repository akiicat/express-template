const winston = require('winston');

const option = {
  filename: `${env.root}/logs/app.log`,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
};

module.exports = new winston.transports.File(option);
