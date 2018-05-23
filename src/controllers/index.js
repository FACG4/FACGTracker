const router = require('express').Router();
const attendance = require('./attendance');
const home = require('./home');
const githubLogin = require('./github-login');
const invite = require('./invite');


router.get('/login', githubLogin.get);

router.get('/github', githubLogin.githubInteract);
router.get('/github/cb', githubLogin.githubInteract, githubLogin.githubCb);
router.get('/', home.get);
router.get('/attendance', attendance.get);
// router.post('/attendance', attendance.post);
router.get('/invite', invite.get);
router.post('/invitebygmail', invite.getcode);
router.get('/gmail/cb', invite.gettoken);

// // testing
// const request = require('request');

// router.get('/gettoken', (req, res, next) => {
//   request.post({
//     url: 'https://www.googleapis.com/oauth2/v3/token',
//     form: {
//       code: '4/AACCmG4S8_iJDpPK3u_upyUrRVefafGlPHkmQwaEoPwf137VcF6cuQw-lGeWSXFQftlyTF-IhvbQdExDTRQuW7w#',
//       redirect_uri: 'http://localhost:3000/gmail/cb',
//       client_id: process.env.GMAILCLIENTID,
//       scope: 'https://www.googleapis.com/auth/gmail.send',
//       client_secret: process.env.GMAILSECRETE,
//       grant_type: 'authorization_code'
//     }
//   }, (err, httpResponse, body) => {
//     console.log(body);
//   });
//   res.send('respond with resource')
// });


module.exports = router;
