exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('Authenticated', req.user);
    next();
  } else {
    console.log('Not Authenticated');
    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM TO LOGIN PAGE
    res.redirect('/login');
  }
};
