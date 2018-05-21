const dbConnection = require('../db_connection');

const executeQuery = (sql, cb) => {
  dbConnection.query(sql, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.rows);
    }
  });
};

const getStudentsInfo = (cb) => {
  const sql = {
    text: "select * from users where role='student' and first_name is not null",
  };
  executeQuery(sql, cb);
};

module.exports = { getStudentsInfo };
