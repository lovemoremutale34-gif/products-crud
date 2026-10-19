const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const path = require('path');

const DB_FILE = process.env.DB_FILE || './database.db';
const db = new DatabaseSync(DB_FILE);

// Initialize the database schema
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);
console.log('✅ Database ready at', DB_FILE);

module.exports = db;