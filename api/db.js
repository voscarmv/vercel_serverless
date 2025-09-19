const knexConfig = require('../knexfile');

const pg = knex(knexConfig[process.env.NODE_ENV || 'production']);

// CRUD



console.log(pg);