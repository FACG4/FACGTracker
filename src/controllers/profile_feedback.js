const userFeedback = require('../model/quires/user_feedback');
const getUserInfo = require('../model/quires/get_user_info');
const formatDate = require('./format_date');

exports.get = (req, res) => {
  userFeedback.getUserfeedback(req.params.id, (getUserFeedbackErr, getUserFeedbackResult) => {
    if (getUserFeedbackErr) return res.status(500);
    getUserInfo(req.params.id, (getUserInfoErr, getUserInfoResult) => {
      if (getUserInfoErr) return res.status(500);
      if (getUserFeedbackResult.length === 0) {
        res.render('profile_feedback', {
          user_id: req.params.id,
          info: getUserInfoResult[0],
          layout: 'student_page',
          style: ['student_header.css', 'profile_feedback.css'],
          script: ['profile_feedback_dom.js'],
        });
      } else {
        res.render('profile_feedback', {
          user_id: req.params.id,
          feedback: getUserFeedbackResult,
          info: getUserInfoResult[0],
          layout: 'student_page',
          style: ['student_header.css', 'profile_feedback.css'],
          script: ['profile_feedback_dom.js'],
        });
      }
    });
  });
};

exports.post = (req, res) => {
  const date = formatDate.getRightFormatDate().newdate.split(',')[1];
  console.log(date);
  userFeedback.postUserFeedback(req.body.user_id, req.body.feedbackContant, date, (postUserFeedbackErr, postUserFeedbackResult) => {
    if (postUserFeedbackErr) return res.status(500);
    res.send('feedback inserted');
  });
};
