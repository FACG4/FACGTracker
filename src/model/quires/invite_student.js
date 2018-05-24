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

const getunregisteredStudents = (cohortId, cb) => {
  const sql = {
    text: "SELECT email FROM users WHERE cohort_id = $1 AND role = 'student' AND github_username is NULL",
    values: [cohortId],
  };
  executeQuery(sql, cb);
};

const checkInviteEmail = (email, cb) => {
  const sql = {
    text: 'SELECT EXISTS (SELECT 1 FROM users WHERE email = $1)',
    values: [email]
  };
  executeQuery(sql, cb);
};

const insertInviteEmail = (email, role, cohortId, cb) => {
  const sql = {
    text: 'INSERT INTO users (email, role, cohort_id) VALUES ($1, $2, $3)',
    values: [email, role, cohortId]
  };
  executeQuery(sql, cb);
};

module.exports = {
  getunregisteredStudents,
  insertInviteEmail,
  checkInviteEmail
};
