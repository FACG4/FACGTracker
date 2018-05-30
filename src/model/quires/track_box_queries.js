const dbConnections = require('../db_connection');
const formatDate = require('../../controllers/format_date');

const date = formatDate.getRightFormatDate().newdate.split(',')[1];

const executeQuery = (sql, cb) => {
  dbConnections.query(sql, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.rows);
    }
  });
};

const presentSt = (cohortId, cb) => {
  const sql = {
    text: 'SELECT a.user_id FROM attendance a INNER JOIN days d ON a.day_id = d.id INNER JOIN weeks w ON d.week_id = w.id INNER JOIN users ON users.id = a.user_id WHERE users.github_username IS NOT NULL AND users.role = \'student\' AND d.date = $1 AND w.cohort_id = $2;',
    values: [date, cohortId],
  };
  dbConnections.query(sql, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.rows);
    }
  });
};

const abcentStudents = (cohortId, cb) => {
  // const date = formatDate.getRightFormatDate().newdate.split(',')[1];
  const sql = 'SELECT id FROM users WHERE role = \'student\' AND github_username IS NOT NULL;';
  dbConnections.query(
    sql,
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        presentSt(cohortId, (err1, getPresentStudentResult) => {
          if (err1) {
            cb(err1);
          } else {
            cb(null, res.rows.length - getPresentStudentResult.length);
          }
        });
      }
    },
  );
};

const leaveStudents = (cb) => {
  const sql = {
    text: 'SELECT a.user_id FROM attendance a INNER JOIN days d ON d.id = a.day_id INNER JOIN users ON users.id = a.user_id WHERE clock_out < \'17:00:00\' AND users.role = \'student\' AND users.github_username IS NOT NULL AND d.date =  $1;',
    values: [date],
  };
  executeQuery(sql, cb);
};

const lateStudents = (cb) => {
  const sql = {
    text: 'SELECT a.user_id FROM attendance a INNER JOIN days d ON d.id = a.day_id INNER JOIN users ON users.id = a.user_id WHERE clock_in > \'09:00:00\' AND users.role = \'student\' AND users.github_username IS NOT NULL AND d.date = $1;',
    values: [date],
  };
  executeQuery(sql, cb);
};

const getTrackBoxInfo = (cohortId, cb) => {
  presentSt(cohortId, (err, present) => {
    if (err) {
      console.error('presentStunetnErr', err);
    } else {
      abcentStudents(cohortId, (err1, abcent) => {
        if (err) {
          console.log('abcentErr', err);
        } else {
          leaveStudents((err2, leave) => {
            if (err) {
              console.log('leaveErr', err);
            } else {
              lateStudents((err3, late) => {
                if (err) {
                  console.log('lateErr', err);
                } else {
                  const data = {
                    my_date: formatDate.getRightFormatDate().newdate,
                    presentSts: present.length,
                    absentSts: abcent,
                    lateSts: late.length,
                    leaveSts: leave.length,
                  };
                  cb(null, data);
                }
              });
            }
          });
        }
      });
    }
  });
};

module.exports = {
  getTrackBoxInfo
};
