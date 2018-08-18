var pjson = require(env.root + '/package.json');

require('@google-cloud/debug-agent').start({
  ...env.google.tracer,
  serviceContext: {
    service: pjson.name,
    version: pjson.version,
  },
});
