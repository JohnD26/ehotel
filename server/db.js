// db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres', // PostgreSQL username
    host: 'localhost',
    database: 'ehotel', // database name
    password: '4505', //database password
    port: 5432, // PostgreSQL's default port is 5432
});

module.exports = pool;
