const dbConnection = require('../db_connection.js');

const checkuser = (email, cb) => {
  const sql = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

module.exports = {
  checkuser,
};
