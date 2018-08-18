const LoggingWinston = require('@google-cloud/logging-winston').LoggingWinston;

const option = {
  ...env.google.tracer,
};

module.exports = new LoggingWinston(option);
