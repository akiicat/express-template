const winston = require('winston');
require('winston-daily-rotate-file');

const option = {
  filename: `${env.root}/logs/log-%DATE%.log`,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
};

module.exports = new winston.transports.DailyRotateFile(option);
