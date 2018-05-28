const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const request = require('request');
const updateUsers = require('../model/quires/update_user');
const checkuser = require('../model/quires/check_user');
require('env2')('./config.env');


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  if (id == null) {
    done(new Error('Wrong user id.'));
  } else {
    done(null, id);
  }
});

let callbackURL = '';
if (process.env.ENV === 'production') {
  callbackURL = 'https://facgtracker.herokuapp.com/github/cb';
} else {
  callbackURL = 'http://localhost:3000/github/cb';
}

passport.use(new GitHubStrategy(
  {
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRETE,
    callbackURL,
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
          console.log('user information from database', result.rows);
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
              role: result.rows[0].role,
              name: result.rows[0].github_username,
              avatar: result.rows[0].avatar
            });
          }
        });
      }
    });
    // request(options, (error, response, body) => {
    //   if (!error && response.statusCode === 200) {
    //     const info = JSON.parse(body);
    //     checkuser.checkuser(info[0].email, (err, result) => {
    //       if (!result.rows.length) {
    //         console.log('not allowed to log in , his email is not in database');
    //         done(null, { err: true, abd: 'potatoes' }, { message: 'Incorrect username.' });
    //         // done(null, false, { message: 'Incorrect username.' });
    //       } else {
    //         selectUserId.selectUserId(info[0].email, (err, result) => {
    //           //             // handel error
    //           done(null, result.rows[0].id);
    //         });
    //         insertUser.insertUsers(profile.username, profile._json.bio, profile._json.avatar_url, info[0].email, (err, result) => {
    //           //             // handel error
    //         });
    //       }
    //     });
    //   }
    // });
  },
));

