// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'challenge',
      user:     'postgres',
      password: 'gojosports'
    },
    pool: {
      min: 2,
      max: 10
    },
  },

};
