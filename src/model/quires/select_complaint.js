const dbConnection = require('../db_connection.js');

const selectComplaint = (cb) => {
  const sql = 'select * from suggestions_complaints  inner join users on suggestions_complaints.user_id=users.id where type=\'complaint\'';

  dbConnection.query(sql, (err, result) => {
    if (err) {
      return cb(err);
    }
    cb(null, result.rows);
  });
};

module.exports = {
  selectComplaint
};
