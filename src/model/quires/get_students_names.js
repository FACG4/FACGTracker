const dbConnections = require('../db_connection');

const usersName = (cb) => {
  const sql = "SELECT * FROM users WHERE role = 'student' AND github_username IS NOT NULL";
  dbConnections.query(
    sql,
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        cb(null, res.rows);
      }
    },
  );
};

module.exports = usersName;
