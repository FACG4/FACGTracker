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
  res.redirect('/');
};

// https://api.github.com/user/emails?access_token=a745e9c1a47a15ce8fa616c5463f775f59817f1f
// https://api.github.com/user/orgs?access_token=a745e9c1a47a15ce8fa616c5463f775f59817f1f

