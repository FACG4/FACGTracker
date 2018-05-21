const fs = require('fs');
const dbConnection = require('./db_connection.js');

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

dbConnection.query(sql, (err, res) => {
  if (err) { throw new Error('Somthing happens when setting up the DataBase'); } else { console.log(`Database Have been Built Successfuly in ${process.env.NODE_ENV || 'DEVELOPMENT'} mode`); }
});
