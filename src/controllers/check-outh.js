exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('Authenticated', req.user);
    next();
  } else {
    console.log('Not Authenticated');
    res.redirect('/login');
  }
};
