const winston = require('./winston');

let logger = function(req, res, next) {
  let time = process.hrtime();
  req.timestamp = new Date();
  req.logs = [];
  res.on('finish', logRequest);
  res.on('close', logRequest);

  function logRequest() {
    res.removeListener('finish', logRequest);
    res.removeListener('close', logRequest);

    var diff = process.hrtime(time);
    req.duration = diff[0] * 1e9 + diff[1];

    winston.write(req, res);
  }

  next();
};

module.exports = logger;
