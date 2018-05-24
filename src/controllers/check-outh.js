exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('Authenticated');
    next();   } else { console.log('Not Authenticated');
    res.redirect('/login');
}
};

