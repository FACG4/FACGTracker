const dbConnection = require('../db_connection');


const insertUsers = (githubUsername, bio, avatar, email, cb) => {
  const sql = {
    text: 'UPDATE users SET (github_username,bio,avatar) = ($1,$2,$3) WHERE email =$4',
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
