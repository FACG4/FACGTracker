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

// const getAttendanceInfo = (cohortId, weekNo, date, cb) => {
//   const sql = {
//     test: 'select users.github_username, days.date, cohort.name from users inner join attendance on attendance.user_id = users.id inner join days on days.id = attendance.day_id inner join cohort ON cohort.id = users.cohort_id where days.week_id = (select id from weeks where weeks.cohort_id = $1 and weeks.week_no = $2) and days.date = $3',
//     values: [cohortId, weekNo, date],
//   };
//   executeQuery(sql, cb);
// };

// new stuff
const getPresetStudnets = (cohortId, date, cb) => {
  const sql = {
    text: 'select attendance.*, users.first_name, users.last_name from attendance inner join users ON users.id = attendance.user_id where attendance.day_id = (select days.id from days inner join weeks on weeks.id = days.week_id where weeks.cohort_id = $1 and days.date = $2)',
    values: [cohortId, date],
  };
  executeQuery(sql, cb);
};

const getAllStudnets = (cohortId, cb) => {
  const sql = {
    text: "select first_name, last_name, id from users where role = 'student' and cohort_id = $1 and github_username is not null",
    values: [cohortId]
  };
  executeQuery(sql, cb);
};

const getAttendanceInfo = (cohortId, date, cb) => {
  getPresetStudnets(cohortId, date, (err, presents) => {
    if (err) {
      console.log(err);
    } else {
      const presentSudnetsIds = presents.map(student => student.user_id);
      console.log('present', presents);

      getAllStudnets(cohortId, (err1, all) => {
        if (err) {
          console.log(err1);
        } else {
          const allStudents = all.filter(student => presentSudnetsIds.indexOf(student.id) === -1);
          console.log(allStudents);
          cb(null, presents.concat(allStudents));
        }
      });
    }
  });
};

// const getAttendanceInfo = (todayDate, cb) => {
//   const sql = {
//     text: "select users.*, attendance.clock_in, attendance.clock_out, attendance.day_id from users left outer join attendance ON attendance.user_id = users.id where users.role='student' and users.phone is not null and (attendance.day_id is null or attendance.day_id = (select days.id from days where days.date = $1))",
//     values: [todayDate],
//   };
//   executeQuery(sql, cb);
// };

const saveAttendance = (userId, clockIn, clockOut, cohortId, date, cb) => {
  const sql = {
    text: 'insert into attendance (user_id, clock_in, clock_out, day_id) values ($1, $2, $3, (select days.id from days inner join weeks on weeks.id = days.week_id inner join cohort on cohort.id = weeks.cohort_id where weeks.cohort_id = $4 and days.date = $5))',
    values: [userId, clockIn, clockOut, cohortId, date],
  };
  executeQuery(sql, cb);
};

const updateAttendance = (clockIn, clockOut, cohortId, date, userId, cb) => {
  const sql = {
    text: 'update attendance set clock_in = $1, clock_out = $2 from days where attendance.day_id = days.id and days.id = (select days.id from days inner join weeks on days.week_id = weeks.id where weeks.cohort_id = $3 and days.date = $4 and attendance.user_id = $5)',
    values: [clockIn, clockOut, cohortId, date, userId]
  };
  executeQuery(sql, cb);
};

const deleteAttendance = (cohortId, date, userId, cb) => {
  const sql = {
    text: 'delete from attendance using days where attendance.day_id = days.id and days.id = (select days.id from days inner join weeks on days.week_id = weeks.id where weeks.cohort_id = $1 and days.date = $2 and attendance.user_id = $3)',
    values: [cohortId, date, userId]
  };
  executeQuery(sql, cb);
};

module.exports = {
  getAttendanceInfo, saveAttendance, updateAttendance, deleteAttendance
};

