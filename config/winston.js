const winston = require('winston');
const LoggingWinston = require('@google-cloud/logging-winston').LoggingWinston;
require('winston-daily-rotate-file');

// define the custom settings for each transport (file, console)
var options = {
  stackdriver: {
    projectId: 'sunlit-inquiry-164609',
    keyFilename: `${env.root}/config/stackdriver.${env.node_env}.json`,
    json: true,
  },
  dailyRotateFile: {
    filename: `${env.root}/logs/app-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  },
  file: {
    level: 'info',
    filename: `${env.root}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
var logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
    new winston.transports.DailyRotateFile(options.dailyRotateFile),
    new LoggingWinston(options.stackdriver),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // console.log(message);
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    // console.log(JSON.parse(message));
    // logger.info(JSON.parse(message));
    logger.info(message);
  },
};

module.exports = logger;
