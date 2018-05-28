const attendanceQueries = require('../model/quires/attendance_queries');
const trackBoxQueries = require('../model/quires/track_box_queries');
const formatDate = require('./format_date');

const dateToday = formatDate.getRightFormatDate().newdate.split(',')[1];

exports.get = (req, res, next) => {
  const date = req.query.date || dateToday;
  attendanceQueries.getAttendanceInfo(1, date, (err, students) => {
    if (err) {
      console.log('gettAttendaceInfoErr', err);
      next(err);
    } else {
      trackBoxQueries.getTrackBoxInfo(date, (err1, result) => {
        if (err1) {
          console.log('trackBoxErr', err1);
          next(err1);
        } else {
          const date2 = formatDate.getRightFormatDate2(date);
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
exports.insert = (req, res, next) => {
  const {
    id, clockIn, clockOut
  } = req.body;
  const { date } = req.body || Date.now();
  attendanceQueries.saveAttendance(id, clockIn, clockOut, cohortId, date, (err, info) => {
    if (err) {
      console.log('err', err);
      next(err);
    } else {
      console.log('saved');
      res.send({ inserted: true, msg: 'record is successfully inserted' });
    }
  });
};

exports.update = (req, res, next) => {
  const {
    id, clockIn, clockOut
  } = req.body;
  const { date } = req.body || Date.now();
  const userId = Number(id);
  attendanceQueries.updateAttendance(clockIn, clockOut, cohortId, date, userId, (err, result) => {
    if (err) {
      console.log('err', err);
      next(err);
    } else {
      console.log('updated');
      res.send({ updated: true, msg: 'record is successfully updated' });
    }
  });
};

exports.delete = (req, res, next) => {
  const {
    id
  } = req.body;
  const { date } = req.body || Date.now();
  const userId = Number(id);
  attendanceQueries.deleteAttendance(cohortId, date, userId, (err, result) => {
    if (err) {
      console.log('deleteErr', err);
      next(err);
    } else {
      console.log('deleted');
      res.send({ deleted: true, msg: 'record is successfully deleted' });
    }
  });
};

