const getUserFeedback = require('../model/quires/get_user_feedback');

exports.get = (req, res) => {
  getUserFeedback(req.params.id, (getUserFeedbackErr, getUserFeedbackResult) => {
    if (getUserFeedbackErr) return res.status(500);
    res.render('profile_feedback', {
      feedback: getUserFeedbackResult[0],
      style: ['profile_feedback.css'],
    });
  });
};
