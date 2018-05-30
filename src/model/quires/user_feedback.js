const dbConnection = require('../db_connection.js');

const getUserfeedback = (userId, cb) => {
  const sql = {
    text: 'SELECT * FROM feedbacks f INNER JOIN users u ON f.user_id = u.id WHERE u.id = $1',
    values: [userId],
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};


const postUserFeedback = (userId, feedbackContent, date, cb) => {
  const sql = {
    text: 'INSERT INTO feedbacks (user_id , content, date) VALUES ($1,$2,$3)',
    values: [userId, feedbackContent, date],
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = {
  getUserfeedback,
  postUserFeedback
};
