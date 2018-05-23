const getPresentStudent = require('../model/quires/get_present_students');
const getAbsentStudent = require('../model/quires/get_absent_students');
const getLateStudent = require('../model/quires/get_late_students');
const getLeaveStudent = require('../model/quires/get_leave_students');
const getWeekMentors = require('../model/quires/get_week_mentors');
const getWeekworkshops = require('../model/quires/get_workshops');


const getRightFormatDate = () => {
  const dateObj = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[dateObj.getDay()];
  const month = dateObj.getUTCMonth() + 1; // months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const newdate = `${year}/${month}/${day}, ${dayName}`;
  return newdate;
};


exports.get = (req, res) => {
  getPresentStudent((getPresentStudentErr, getPresentStudentResult) => {
    if (getPresentStudentErr) return res.status(500);
    getAbsentStudent((getAbsentStudentErr, getAbsentStudentResult) => {
      if (getAbsentStudentErr) return res.status(500);
      getLateStudent((getLateStudentErr, getLateStudentResult) => {
        if (getLateStudentErr) return res.status(500);
        getLeaveStudent((getLeaveStudentErr, getLeaveStudentResult) => {
          if (getLeaveStudentErr) return res.status(500);
          getWeekMentors((getWeekMentorsErr, getWeekMentorsResult) => {
            if (getWeekMentorsErr) return res.status(500);
            getWeekworkshops((getWeekworkshopsErr, getWeekworkshopsResult) => {
              if (getWeekworkshopsErr) return res.status(500);
              return res.render('home', {
                my_date: getRightFormatDate(),
                presentSts: getPresentStudentResult,
                absentSts: getAbsentStudentResult,
                lateSts: getLateStudentResult,
                leaveSts: getLeaveStudentResult,
                weekMentors: getWeekMentorsResult,
                weekWorkshops: getWeekworkshopsResult,
                weekWorkshops1: getWeekworkshopsResult[0],
                style: 'home_style.css',
                script: 'home_dom.js',
              });
            });
          });
        });
      });
    });
  });
};
