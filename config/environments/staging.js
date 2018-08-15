module.exports = {
  port: process.env.PORT || 8080,

  // mongodb
  // database: 'mongodb://localhost:27017/ecg_staging',

  // cassandra
  database_host: ['localhost'],
  database_port: 9042,
  database_keyspace: 'ecg',

  google: {
    tracer: {
      projectId: 'sunlit-inquiry-164609',
      keyFilename: `${env.root}/config/stackdriver.staging.json`,
    },
  },
};
