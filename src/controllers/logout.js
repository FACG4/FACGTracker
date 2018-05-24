
exports.get = (req, res) => {
  req.logout();
  req.sessionOptions.maxAge = 0;
  res.redirect('/login');
  // res.clearCookie('black_sail');
};
