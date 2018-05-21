const dbConnections = require('../db_connection');

const weekWorkshops = (cb) => {
  const sql = 'select ws.title , ws.start_time , ws.end_time , w.name ,w.id , d.day_no from workshops ws inner join days d on d.id = ws.day_id INNER JOIN weeks w ON d.week_id = w.id where w.id = 2 ;';
  dbConnections.query(
    sql,
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        cb(null, res.rows);
      }
    },
  );
};

module.exports = weekWorkshops;
