const passport = require('passport');


exports.get = (req, res) => {
  res.render('login', {
    style: ['login_style.css']
  });
};

exports.githubInteract = passport.authenticate('github', {
  scope: ['profile', 'read:org', 'user:email'],
});

exports.githubCb = (req, res) => {
  console.log(req.user.role);

  if (req.user.role === 'cf') {
    res.redirect('/');
  } else if (req.user.role === 'student') {
    res.redirect('/stdPanel');
  } else {
    res.redirect('/unauthorized');
  }
};
