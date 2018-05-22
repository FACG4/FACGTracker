const get = require('../model/quires/get');
const post = require('../model/quires/post');

exports.get = (req, res) => {
  get.getStudentsInfo((err, students) => {
    res.render('attendance', { students });
  });
};

// under dev

// exports.post = (req, res) => {
//   post.getAttendanceInfo(1, (err, info) => {
//     console.log('info', info);
//   });
// };
