const dbConnections = require('../db_connection');
const formatDate = require('../../controllers/format_date');

const date = formatDate.getRightFormatDate().newdate.split(',')[1];
const leaveStudents = (cb) => {
  const sql = {
    text: 'SELECT a.user_id FROM attendance a INNER JOIN days d ON d.id = a.day_id WHERE clock_out < \'17:00:00\' AND d.date =  $1 ;',
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


module.exports = leaveStudents;
