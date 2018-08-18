const MESSAGE = Symbol.for('message');

let format = function(req, res) {
  let params = [];

  if (_.isObject(req.query) && !_.isEmpty(req.query)) {
    params.push(`Query: ${JSON.stringify(req.query)}`);
  }

  if (_.isObject(res.body) && !_.isEmpty(res.body)) {
    params.push(`Parameters: ${JSON.stringify(res.body)}`);
  }

  return (
    '\n' +
    [
      `Started ${req.method} "${req.url}" for ${req.ip} at ${req.timestamp.toISOString()}`,
      ...params,
      ...req.logs,
      `Response ${res.statusCode} in ${req.duration / 1e6} ms`,
    ].join('\n  ')
  );
};

module.exports = {
  entry: function(entry, opts) {
    if (entry.error) {
      console.log(entry.error);
    }

    let req = entry.req;
    let res = entry.res;

    entry[MESSAGE] = format(req, res);

    return entry;
  },
  log: format,
};
