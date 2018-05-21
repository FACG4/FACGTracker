const passport = require('passport');

exports.get = (req, res) => {
  res.render('login');
};

exports.githubInteract = passport.authenticate('github', {
  scope: ['profile', 'read:org'],
});

exports.githubCb = (req, res) => {
  res.send('fff');
};

