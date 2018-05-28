const router = require('express').Router();
const attendance = require('./attendance');
const home = require('./home');
const githubLogin = require('./github-login');
const invite = require('./invite');
const manageSt = require('./manage_student');
const viewProfile = require('./view_profile');
const passport = require('passport');
const logout = require('./logout.js');
// const { isAuthenticated, isCF, isStudent } = require('./check-outh.js');
const { isAuthenticated } = require('./check-outh.js');
const { isCF } = require('./check-outh.js');
const { isStudent } = require('./check-outh.js');
const error = require('./error');
const notincodeacademy = require('./notincodeacademy');
const stdPanel = require('./stdPanel');
const unauthorized = require('./unauthorized');


router.get('/', isAuthenticated, isCF, home.get)
  .get('/unauthorized', unauthorized.get)
  .get('/manageSt', isAuthenticated, isCF, manageSt.get)
  .post('/deleteStudent', isAuthenticated, isCF, manageSt.delete)
  .get('/attendance', isAuthenticated, isCF, attendance.get)
  .post('/attendance/insert', attendance.insert)
  .get('/logout', logout.get)
  .post('/attendance/update', isAuthenticated, isCF, attendance.update)
  .post('/attendance/delete', isAuthenticated, isCF, attendance.delete)
  .get('/inviteSt', isAuthenticated, isCF, invite.get)
  .post('/invitebygmail', invite.getcode)
  .get('/gmail/cb', invite.gettoken)
  .get('/login', githubLogin.get)
  .get('/viewProfile/:id', isAuthenticated, isCF, viewProfile.get)
  .get('/github', githubLogin.githubInteract)
  .get('/github/cb', passport.authenticate('github'), githubLogin.githubCb)

  // {
  //   successReturnToOrRedirect: '/',
  //   failureRedirect: '/login',
  // }),
  .get('/notincodeacademy', notincodeacademy.get)
  .get('/stdPanel', isAuthenticated, isStudent, stdPanel.get)
  .use(error.client)
  .use(error.server);

module.exports = router;
