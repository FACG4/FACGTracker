const dbConnections = require('../db_connection');
const formatDate = require('../../controllers/format_date');


const getDate = (cb) => {
  const sql = 'SELECT id FROM days WHERE date $1 ;';
  dbConnections.query(
    sql,
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        getPresentStudent(formatDate.getRightFormatDate.day, (err1, getPresentStudentResult) => {
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
