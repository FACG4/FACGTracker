const dbConnection = require('../db_connection.js');

const getUserInfo = (userId, cb) => {
  const sql = {
    text: 'SELECT * FROM users WHERE id = $1',
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
