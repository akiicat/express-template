const winston = require('winston');

const File = require('./loggers/file');
const Console = require('./loggers/console');
const Daily = require('./loggers/daily');
const Stackdriver = require('./loggers/stackdriver');

const JsonFormatter = require('./formatters/json');
const StringFormatter = require('./formatters/string');

const StringLogger = winston.createLogger({
  exitOnError: false,
  transports: [Console, File],
  format: winston.format(StringFormatter.entry)(),
});

const JsonLogger = winston.createLogger({
  exitOnError: false,
  transports: [Stackdriver, Daily],
  // format: winston.format(JsonFormatter)(), // winston 3.0.0 but stackdriver not support
});

module.exports = {
  write: function(req, res) {
    let level = 'info';
    if (res.statusCode >= 500) level = 'error';
    if (req.statusCode >= 400) level = 'warn';

    StringLogger.log(level, '', {req, res});
    JsonLogger.log(level, StringFormatter.log(req, res), JsonFormatter(req, res));
    // JsonLogger.log(level, '', {req, res});
  },
};
