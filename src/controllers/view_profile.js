const getUserInfo = require('../model/quires/get_user_info');

exports.get = (req, res) => {
  getUserInfo(req.params.id, (getUserInfoErr, getUserInfoResult) => {
    if (getUserInfoErr) return res.status(500);
    res.render('view_profile', {
      user_id: req.params.id,
      info: getUserInfoResult[0],
      layout: 'student_page',
      style: ['student_header.css', 'profile_style.css'],
      script: ['view_profile_dom.js'],
    });
  });
};
