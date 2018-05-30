const userRedflags = require('../model/quires/user_redflags');
const getUserInfo = require('../model/quires/get_user_info');

exports.get = (req, res) => {
  userRedflags.getUserRedflags(req.params.id, (getUserRedflagsErr, getUserRedflagsResult) => {
    if (getUserRedflagsErr) return res.status(500);
    getUserInfo(req.params.id, (getUserInfoErr, getUserInfoResult) => {
      if (getUserInfoErr) return res.status(500);
      if (getUserRedflagsResult.length === 0) {
        res.render('profile_redflag', {
          user_id: req.params.id,
          info: getUserInfoResult[0],
          layout: 'student_page',
          style: ['student_header.css', 'profile_redflag_style.css'],
          script: ['profile_redflag_dom.js'],
        });
      } else {
        res.render('profile_redflag', {
          user_id: req.params.id,
          flags: getUserRedflagsResult,
          info: getUserInfoResult[0],
          layout: 'student_page',
          style: ['student_header.css', 'profile_redflag_style.css'],
          script: ['profile_redflag_dom.js'],
        });
      }
    });
  });
};

exports.post = (req, res) => {
  userRedflags.postUserRedflags(req.body.user_id, req.body.flagType, (postUserRedflagsErr, postUserRedflagsResult) => {
    console.log(req.body.user_id);
    if (postUserRedflagsErr) return res.status(500);
  });
};
