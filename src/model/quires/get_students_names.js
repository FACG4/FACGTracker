const dbConnections = require('../db_connection');

const usersName = (cb) => {
  const sql = "SELECT id, first_name, last_name FROM users WHERE role = 'student'";
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
