const dbConnections = require('../db_connection');
const formatDate = require('../../controllers/format_date');

const date = formatDate.getRightFormatDate().newdate.split(',')[1];
const presentSt = (cb) => {
  const sql = {
    text: 'SELECT a.user_id FROM attendance a JOIN days d ON a.day_id = d.id JOIN weeks w ON d.week_id = w.id WHERE d.date = $1;',
    values: [date],
  };
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

module.exports = presentSt;
