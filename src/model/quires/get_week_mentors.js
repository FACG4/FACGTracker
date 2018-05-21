const dbConnections = require('../db_connection');

const weekMentors = (cb) => {
  const sql = 'select users.first_name, users.last_name from users inner join week_mentors ON week_mentors.user_id = users.id inner join weeks ON weeks.id = week_mentors.week_id where weeks.week_no = 2 and weeks.cohort_id = (select cohort.id from cohort where cohort.name = \'FACG4\');';
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
