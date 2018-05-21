const dbConnections = require('../db_connection');

const currentDate = (cb) => {
  const sql = 'select a.user_id from attendance a join days d on a.day_id = d.id join weeks w on d.week_id = w.id where day_id = 2 ;';
  dbConnections.query(
    sql,
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        cb(null, res.rows.length);
      }
    },
  );
};

module.exports = currentDate;
