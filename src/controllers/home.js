const formatDate = require('./format_date');
const getWeekMentors = require('../model/quires/get_week_mentors');
const getWeekworkshops = require('../model/quires/get_workshops');
const trackBoxQueries = require('../model/quires/track_box_queries');

const date = formatDate.getRightFormatDate().newdate.split(',')[1];

exports.get = (req, res) => {
  getWeekMentors((getWeekMentorsErr, getWeekMentorsResult) => {
    if (getWeekMentorsErr) return res.status(500);
    getWeekworkshops((getWeekworkshopsErr, getWeekworkshopsResult) => {
      if (getWeekworkshopsErr) return res.status(500);
      trackBoxQueries.getTrackBoxInfo(date, (err, result) => {
        if (err) {
          console.log('TrackboxInfoErr', err);
        } else {
          res.render('home', {
            my_date: formatDate.getRightFormatDate().newdate,
            presentSts: result.presentSts,
            absentSts: result.absentSts,
            lateSts: result.lateSts,
            leaveSts: result.leaveSts,
            weekMentors: getWeekMentorsResult,
            weekWorkshops: getWeekworkshopsResult,
            weekWorkshops1: getWeekworkshopsResult[0],
            style: ['home_style.css'],
            script: ['asidebar_dom.js', 'home_dom.js'],
            name: req.user.name,
            avatar: req.user.avatar
          });
        }
      });
    });
  });
};
