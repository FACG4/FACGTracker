const getUserInfo = require('../model/quires/get_user_info');

exports.get = (req, res) => {
  getUserInfo(req.params.id, (getUserInfoErr, getUserInfoResult) => {
    if (getUserInfoErr) return res.status(500);
    res.render('view_profile', {
      info: getUserInfoResult[0],
      style: ['profile_style.css'],
      script: ['profile_dom.js'],
    });
  });
};
