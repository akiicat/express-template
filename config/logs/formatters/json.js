const MESSAGE = Symbol.for('message');
const META = Symbol.for('meta');

module.exports = function(entry, opts) {
  // if (entry.error) {
  //   console.log(entry.error);
  // }

  // let req = entry.req;
  // let res = entry.res;
  let req = entry;
  let res = opts;

  // (entry['meta'] = entry[META] =
  return {
    httpRequest: {
      requestUrl: req.url,
      requestMethod: req.method,
      requestSize: req.socket.bytesRead,
      remoteIp: req.connection.remoteAddress,

      status: res.statusCode,
      responseSize: res.getHeader('Content-Length') || res._contentLength || 0,
      userAgent: req.headers['user-agent'],

      remoteIp: req.connection.remoteAddress,
      serverIp: req.connection.localAddress,
      latency: {
        seconds: Math.floor(req.duration / 1e9),
        nanos: req.duration % 1e9,
      },
      protocol: req.protocol,
    },
    jsonPayload: {
      query: req.query,
      body: req.body,
      logs: req.logs,
      errors: entry.error || {},
    },
  };

  // return entry;
};
