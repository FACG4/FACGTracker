const dbConnections = require('../db_connection');
const formatDate = require('../../controllers/format_date');

const date = formatDate.getRightFormatDate().newdate.split(',')[1];
const weekWorkshops = (cb) => {
  const sql = {
    text: 'SELECT d.id, d.day_no, w.week_no, w.name, wo.title, wo.start_time, wo.end_time FROM days d INNER JOIN weeks w ON w.id = d.week_id INNER JOIN workshops wo ON wo.day_id = d.id WHERE d.date = $1 AND w.cohort_id = 1; ;',
    values: [date],
  };
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

module.exports = weekWorkshops;
