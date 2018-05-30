const attendanceQueries = require('../model/quires/attendance_queries');
const trackBoxQueries = require('../model/quires/track_box_queries');
const formatDate = require('./format_date');

const dateToday = formatDate.getRightFormatDate().newdate.split(',')[1];

exports.get = (req, res) => {
  attendanceQueries.getAttendanceInfo(req.user.cohort_id, dateToday, (err, students) => {
    if (err) {
      console.log('gettAttendaceInfoErr', err);
    } else {
      trackBoxQueries.getTrackBoxInfo(req.user.cohort_id, (err1, result) => {
        if (err) {
          console.log('trackBoxErr', err1);
        } else {
          res.render('attendance', {
            my_date: formatDate.getRightFormatDate().newdate,
            presentSts: result.presentSts,
            absentSts: result.absentSts,
            lateSts: result.lateSts,
            leaveSts: result.leaveSts,
            students,
            style: ['attendance.css'],
            script: ['attendance_dom.js', 'asidebar_dom.js'],
            name: req.user.name,
            avatar: req.user.avatar,
            cohortName: req.user.cohort_name
          });
        }
      });
    }
  });
};

exports.insert = (req, res) => {
  const {
    id, clockIn, clockOut,
  } = req.body;
  attendanceQueries.saveAttendance(id, clockIn, clockOut, req.user.cohort_id, dateToday, (err, info) => {
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
  attendanceQueries.updateAttendance(clockIn, clockOut, req.user.cohort_id, dateToday, userId, (err, res) => {
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
  attendanceQueries.deleteAttendance(req.user.cohort_id, dateToday, userId, (err, result) => {
    if (err) {
      console.log('deleteErr', err);
    } else {
      console.log('deleted');
    }
  });
};
