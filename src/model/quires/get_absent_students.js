const dbConnections = require('../db_connection');
const getPresentStudent = require('./get_present_students');

const abcentStudents = (cb) => {
  const sql = 'SELECT id FROM users ;';
  dbConnections.query(
    sql,
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        getPresentStudent((err1, getPresentStudentResult) => {
          if (err1) {
            cb(err1);
          } else {
            cb(null, res.rows.length - getPresentStudentResult);
          }
        });
      }
    },
  );
};


module.exports = abcentStudents;
