// cassandra
let models = require('express-cassandra');

//Tell express-cassandra to use the models-directory, and
//use bind() to load the models using cassandra configurations.
models.setDirectory(`${env.root}/app/models`).bind(
  {
    clientOptions: {
      contactPoints: env.database_host,
      protocolOptions: {port: env.database_port},
      keyspace: env.database_keyspace,
      queryOptions: {consistency: models.consistencies.one},
    },
    ormOptions: {
      defaultReplicationStrategy: {
        class: 'SimpleStrategy',
        replication_factor: 1,
      },
      migration: 'safe',
    },
  },
  function(err) {
    if (err) throw err;

    // You'll now have a `person` table in cassandra created against the model
    // schema you've defined earlier and you can now access the model instance
    // in `models.instance.Person` object containing supported orm operations.
  },
);

module.exports = models;

// mongodb
//
// let mongoose = require('mongoose');
//
// mongoose.connect(
//   env.database,
//   {useNewUrlParser: true},
//   function() {
//     console.log('db connected');
//   },
// );
//
// module.exports = mongoose;
//
//
