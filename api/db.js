const knexfile = require('../knexfile');

const pg = require('knex')(knexfile.production);
console.log(pg);