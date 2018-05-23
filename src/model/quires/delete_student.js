const dbConnections = require('../db_connection');

const deleteStudent = (studentId, cb) => {
  const sql = {
    text: 'DELETE FROM users WHERE id = $1;',
    values: [studentId],
  };
  dbConnections.query(
    sql,
    (err) => {
      if (err) {
        cb(err);
      }
    },
  );
};

module.exports = deleteStudent;
