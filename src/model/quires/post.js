const dbConnection = require('../db_connection');

const executeQuery = (sql, cb) => {
  dbConnection.query(sql, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.rows);
    }
  });
};

const getAttendanceInfo = (cohortId, weekNo, date, cb) => {
  const sql = {
    test: 'select users.github_username, days.date, cohort.name from users inner join attendance on attendance.user_id = users.id inner join days on days.id = attendance.day_id inner join cohort ON cohort.id = users.cohort_id where days.week_id = (select id from weeks where weeks.cohort_id = $1 and weeks.week_no = $2) and days.date = $3',
    values: [cohortId, weekNo, date],
  };
  executeQuery(sql, cb);
};

const saveAttendance = (userId, clockIn, clockOut, cohortName, date, cb) => {
  const sql = {
    text: 'insert into attendance (user_id, clock_in, clock_out, day_id) values ($1, $2, $3, (select days.id from days inner join weeks on weeks.id = days.week_id inner join cohort on cohort.id = weeks.cohort_id where weeks.cohort_id = (select cohort.id from cohort where cohort.name = $4) and days.date = $5))',
    values: [userId, clockIn, clockOut, cohortName, date],
  };
  executeQuery(sql, cb);
};

module.exports = { getAttendanceInfo, saveAttendance };

