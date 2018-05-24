const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const request = require('request');
const insertUser = require('../model/quires/insert_user');
const checkuser = require('../model/quires/check_user');
const selectUserId = require('../model/quires/select_user_id');
require('env2')('./config.env');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  if (id == null) {
    done(new Error('Wrong user id.'));
  }
  done(null, id);
});

passport.use(new GitHubStrategy(
  {
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRETE,
    callbackURL: 'http://localhost:3000/github/cb',
    profileFields: ['username', 'bio', 'avatar_url', 'email'],
  },
  (accessToken, refreshToken, profile, done) => {
    const options = {
      url: `https://api.github.com/user/emails?access_token=${accessToken}`,
      headers: {
        'User-Agent': 'request',
      },
    };

    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const info = JSON.parse(body);
        checkuser.checkuser(info[0].email, (err, result) => {
          if (!result.rows.length) {
            console.log('not allowed to log in , his email is not in database');
            done(null, false, { message: 'Incorrect username.' });
          } else {
            insertUser.insertUsers(profile.username, profile._json.bio, profile._json.avatar_url, info[0].email, (err, result) => {
              //             // handel error
            });
            selectUserId.selectUserId(info[0].email, (err, result) => {
              //             // handel error
              done(null, result.rows[0].id);
            });
          }
        });
      }
    });
  },
));

