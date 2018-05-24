const dbConnection = require('../db_connection');


const insertUsers = (githubUsername, bio, avatar, email, cb) => {
  const sql = {
    text: 'INSERT INTO users (github_username,bio,avatar,email) VALUES ($1,$2,$3,$4)',
    values: [githubUsername, bio, avatar, email],
  };

  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};


module.exports = {
  insertUsers,
};
