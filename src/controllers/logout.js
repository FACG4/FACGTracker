
const session = require('express-session');
const logout = require('express-passport-logout');


// exports.get = (req, res, next) => {

//   req.session.destroy();
//   logout();
//   res.redirect('/login');
// };


exports.get = (req, res) => {
  req.logout();
  req.sessionOptions.maxAge = 0;
    res.redirect('/login');
  // res.clearCookie('black_sail');
};
