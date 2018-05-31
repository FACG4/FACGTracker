const dbConnections = require('../db_connection');
const formatDate = require('../../controllers/format_date');

const date = formatDate.getRightFormatDate().newdate.split(',')[1];

const weekMentors = (cb) => {
  const sql = {
    text: "SELECT u.first_name, u.last_name FROM users u INNER JOIN week_mentors wm ON wm.user_id = u.id INNER JOIN weeks w ON w.id = wm.week_id INNER JOIN days ON days.week_id = w.id WHERE u.role = \'mentor\' and w.cohort_id = 1 and days.date = $1",
    values: [date]
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

module.exports = weekMentors;
