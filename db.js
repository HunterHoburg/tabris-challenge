const configuration = require('./knexfile')['development'];

module.exports = require('knex')(configuration);
