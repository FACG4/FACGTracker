const attendanceQueries = require('../model/quires/attendance_queries');

exports.get = (req, res) => {
  attendanceQueries.getAttendanceInfo(1, '2018-05-20', (err, students) => {
    res.render('attendance', { students, style: ['home_style.css', 'attendance.css'], script: 'main.js' });
  });
};

const cohortId = 1;
const date = '2018-05-20';
exports.insert = (req, res) => {
  const {
    id, clockIn, clockOut,
  } = req.body;
  attendanceQueries.saveAttendance(id, clockIn, clockOut, cohortId, date, (err, info) => {
    if (err) {
      console.log('err', err);
    } else {
      console.log('saved');
    }
  });
};

exports.update = (req, res) => {
  const {
    id, clockIn, clockOut,
  } = req.body;
  const userId = Number(id);
  attendanceQueries.updateAttendance(clockIn, clockOut, cohortId, date, userId, (err, res) => {
    if (err) {
      console.log('err', err);
    } else {
      console.log('worked');
    }
  });
};

exports.delete = (req, res) => {
  const {
    id
  } = req.body;
  const userId = Number(id);
  attendanceQueries.deleteAttendance(cohortId, date, userId, (err, result) => {
    if (err) {
      console.log('deleteErr', err);
    } else {
      console.log('deleted');
    }
  });
};

