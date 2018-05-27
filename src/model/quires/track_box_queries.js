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

const presentSt = (date, cb) => {
  const sql = {
    text: 'SELECT a.user_id FROM attendance a JOIN days d ON a.day_id = d.id JOIN weeks w ON d.week_id = w.id WHERE d.date = $1;',
    values: [date],
  };
  dbConnections.query(sql, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.rows);
    }
  });
};

const abcentStudents = (cb) => {
  const date = formatDate.getRightFormatDate().newdate.split(',')[1];
  const sql = 'SELECT id FROM users WHERE role = \'student\';';
  dbConnections.query(
    sql,
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        presentSt(date, (err1, getPresentStudentResult) => {
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

const leaveStudents = (date, cb) => {
  const sql = {
    text: 'SELECT a.user_id FROM attendance a INNER JOIN days d ON d.id = a.day_id WHERE clock_out < \'17:00:00\' AND d.date =  $1 ;',
    values: [date],
  };
  executeQuery(sql, cb);
};

const lateStudents = (date, cb) => {
  const sql = {
    text: 'SELECT a.user_id FROM attendance a INNER JOIN days d ON d.id = a.day_id WHERE clock_in > \'09:00:00\' AND d.date = $1 ;',
    values: [date],
  };
  executeQuery(sql, cb);
};

const getTrackBoxInfo = (date, cb) => {
  presentSt(date, (err, present) => {
    if (err) {
      console.error('presentStunetnErr', err);
    } else {
      abcentStudents((err1, abcent) => {
        if (err) {
          console.log('abcentErr', err);
        } else {
          leaveStudents(date, (err2, leave) => {
            if (err) {
              console.log('leaveErr', err);
            } else {
              lateStudents(date, (err3, late) => {
                if (err) {
                  console.log('lateErr', err);
                } else {
                  const data = {
                    my_date: formatDate.getRightFormatDate().newdate,
                    presentSts: present.length,
                    absentSts: abcent,
                    lateSts: leave.length,
                    leaveSts: late.length,
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
