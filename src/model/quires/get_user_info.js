const dbConnection = require('../db_connection.js');

const getUserInfo = (userId, cb) => {
  const sql = {
    text: 'SELECT users.*, cohort.name as cohort_name FROM users INNER JOIN cohort ON cohort.id = users.cohort_id WHERE users.id = $1',
    values: [userId],
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = getUserInfo;
