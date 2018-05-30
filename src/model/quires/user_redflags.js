const dbConnection = require('../db_connection.js');

const getUserRedflags = (userId, cb) => {
  const sql = {
    text: 'SELECT f.id, f.user_id, f.type FROM flags f INNER JOIN users u ON f.user_id = u.id WHERE f.user_id = $1',
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


const postUserRedflags = (userId, flagType, cb) => {
  const sql = {
    text: 'INSERT INTO flags (user_id , type) VALUES ($1,$2)',
    values: [userId, flagType],
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
  getUserRedflags,
  postUserRedflags
};
