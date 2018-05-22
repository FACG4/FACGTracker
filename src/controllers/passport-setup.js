const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
require('env2')('./config.env');

passport.use(new GitHubStrategy(
  {
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRETE,
    callbackURL: 'http://localhost:3000/github/cb',

  },
  (accessToken, refreshToken, profile, done) => {
    console.log(profile);
  },
));
