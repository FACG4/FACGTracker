const dbConnection = require('../db_connection');

const insertUsers = (goodsName, imgUrl, price, description, cb) => {
  const sql = {
    text: 'INSERT INTO goods (goodsName,imgUrl, price, description) VALUES ($1, $2, $3 ,$4)',
    values: [goodsName, imgUrl, price, description]
  };

  dbConnection.query(sql, (err, res) => {
    if (err) {
      return cb(err);
    }
    cb(null, res);
  });
};

module.exports = {
  insertUsers
};
