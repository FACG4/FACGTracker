const attendanceQueries = require('../model/quires/attendance_queries');
const trackBoxQueries = require('../model/quires/track_box_queries');
const formatDate = require('./format_date');

const dateToday = formatDate.getRightFormatDate().newdate.split(',')[1];

exports.get = (req, res) => {
  const date = req.query.date || dateToday;
  console.log('dd', date);

  attendanceQueries.getAttendanceInfo(1, date, (err, students) => {
    if (err) {
      console.log('gettAttendaceInfoErr', err);
    } else {
      trackBoxQueries.getTrackBoxInfo(date, (err1, result) => {
        if (err) {
          console.log('trackBoxErr', err1);
        } else {
          const date2 = formatDate.getRightFormatDate2(date);
          console.log('date2', date2);

          res.render('attendance', {
            date: date2.todayDate,
            presentSts: result.presentSts,
            absentSts: result.absentSts,
            lateSts: result.lateSts,
            leaveSts: result.leaveSts,
            students,
            style: ['home_style.css', 'attendance.css'],
            script: ['main.js', 'home_dom.js']
          });
        }
      });
    }
  });
};

const cohortId = 1;
// const date = '2018-05-20';
exports.insert = (req, res) => {
  const {
    id, clockIn, clockOut
  } = req.body;
  const { date } = req.body || Date.now();
  console.log('lkasfjsdl', date);
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
    id, clockIn, clockOut
  } = req.body;
  const { date } = req.body || Date.now();
  console.log('lkasfjsdl222', date);

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
  const { date } = req.body || Date.now();
  console.log('lkasfjsdl3333', date);

  const userId = Number(id);
  attendanceQueries.deleteAttendance(cohortId, date, userId, (err, result) => {
    if (err) {
      console.log('deleteErr', err);
    } else {
      console.log('deleted');
    }
  });
};

