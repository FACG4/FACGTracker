const router = require('express').Router();
const attendance = require('./attendance');
const home = require('./home');
const githubLogin = require('./github-login');
const invite = require('./invite');
const manageSt = require('./manage_student');
const viewProfile = require('./view_profile');
const profileFeedback = require('./profile_feedback');
const passport = require('passport');
const logout = require('./logout.js');
const {
  isAuthenticated
} = require('./check-outh.js');

router.get('/', isAuthenticated, home.get)
  .get('/manageSt', isAuthenticated, manageSt.get)
  .post('/deleteStudent', isAuthenticated, manageSt.delete)
  .get('/attendance', isAuthenticated, attendance.get)
  .post('/attendance/insert', attendance.insert)
  .get('/logout', logout.get)
  .post('/attendance/update', isAuthenticated, attendance.update)
  .post('/attendance/delete', isAuthenticated, attendance.delete)
  .get('/inviteSt', isAuthenticated, invite.get)
  .post('/invitebygmail', invite.getcode)
  .get('/gmail/cb', invite.gettoken)
  .get('/login', githubLogin.get)
  .get('/viewProfile/:id', isAuthenticated, viewProfile.get)
  .get('/feedback/:id', isAuthenticated, profileFeedback.get)
  .get('/github', githubLogin.githubInteract)
  .get('/github/cb', passport.authenticate('github', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
  }), githubLogin.githubCb);


module.exports = router;
