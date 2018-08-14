let winston = require('./winston');

module.exports = function logger(req, res, next) {
  req._startTime = new Date();
  res.on('finish', logRequest);
  res.on('close', logRequest);

  function logRequest() {
    res.removeListener('finish', logRequest);
    res.removeListener('close', logRequest);

    req._logs.push(end());

    let log = '\n' + _.compact(req._logs).join('\n');
    console.log(log);
    winston.stream.write(log);
    debugger;
  }

  function start() {
    return `Started ${req.method} "${req.url}" for ${req.ip} at ${new Date().toISOString()}`;
  }

  function end() {
    let time = Date.now() - req._startTime;
    return `  Response ${res.statusCode} in ${time} ms`;
  }

  function query() {
    if (_.isObject(req.query) && !_.isEmpty(req.query)) {
      return '  Query: ' + JSON.stringify(req.query);
    }
  }

  function params() {
    if (_.isObject(req.body) && !_.isEmpty(req.body)) {
      return '  Parameters: ' + JSON.stringify(req.body);
    }
  }

  req._logs = [start(), query(), params()];

  next();
};
