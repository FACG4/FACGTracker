const router = require('express').Router();
const attendance = require('./attendance');
const home = require('./home');
const githubLogin = require('./github-login');
const invite = require('./invite');
const manageSt = require('./manage_student');
const viewProfile = require('./view_profile');
const passport = require('passport');
const logout = require('./logout.js');
const { isAuthenticated } = require('./check-outh.js');

router.get('/', home.get)
  .get('/manageSt', manageSt.get)
  .post('/deleteStudent', manageSt.delete)
  .get('/attendance', attendance.get)
  .post('/attendance/insert', attendance.insert)
  .get('/logout', logout.get)
  .post('/attendance/update', attendance.update)
  .post('/attendance/delete', attendance.delete)
  .get('/inviteSt', invite.get)
  .post('/invitebygmail', invite.getcode)
  .get('/gmail/cb', invite.gettoken)
  .get('/login', githubLogin.get)
  .get('/viewProfile/:id', viewProfile.get)
  .get('/github', githubLogin.githubInteract)
  .get('/github/cb', passport.authenticate('github', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
  }), githubLogin.githubCb);


module.exports = router;
