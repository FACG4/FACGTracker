const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const request = require('request');
const updateUsers = require('../model/quires/update_user');
const checkuser = require('../model/quires/check_user');
const getUserInfo = require('../model/quires/get_user_info');
require('env2')('./config.env');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  if (user == null) {
    done(new Error('Wrong user id.'));
  } else if (user.id) {
    getUserInfo(user.id, (err, userRes) => {
      if (err) {
        done(new Error('db error', err));
      } else {
        const userInfo = userRes[0];
        userInfo.name = userInfo.first_name ? `${userInfo.first_name} ${userInfo.last_name}` : `${userInfo.github_username}`;
        done(null, userInfo);
      }
    });
  } else {
    done(null, user);
  }
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
          if (!result.rows.length) { // email doesnt exist in db
            console.log('not allowed to log in , his email is not in database');
            done(null, { emaiLnotInDB: true });
          } else if (!result.rows[0].github_username) {
            updateUsers.updateUsers(
              profile.username, profile._json.bio, profile._json.avatar_url, info[0].email,
              (err, result2) => {
                done(null, {
                  id: result.rows[0].id,
                  errDb: err,
                  role: result.rows[0].role,
                });
              }
            );
          } else {
            done(null, {
              id: result.rows[0].id,
              errDb: err,
              role: result.rows[0].role
            });
          }
        });
      }
    });
  },
));
