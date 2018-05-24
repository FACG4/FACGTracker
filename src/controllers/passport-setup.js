const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const request = require('request');
const insertUser = require('../model/quires/insert_user');
const checkuser = require('../model/quires/check_user');

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
    // console.log('accessToken: ', accessToken);
    const options = {
      url: `https://api.github.com/user/emails?access_token=${accessToken}`,
      headers: {
        'User-Agent': 'request',
      },
    };

    let info;
    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        info = JSON.parse(body);
        // console.log(profile);

        checkuser.checkuser( info[0].email, (err, result) => {
          console.log(result.rows[0].email);
          
          // if (!result.length) {
          //   res.send('');
          // } else {
          // }
        });


        
        insertUser.insertUsers(profile.username, profile._json.bio, profile._json.avatar_url, info[0].email, (err, result) => {
          //handel
        });
      }
    });
    const data = {
      username: profile.username,
      id: profile.id,
    };
    done(null, profile.id);
  },
));



