const dbConnections = require('../db_connection');

const currentDate = (cb) => {
  const sql = 'SELECT date FROM days WHERE week_id = 2 AND day_no=2;';
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

module.exports = currentDate;
