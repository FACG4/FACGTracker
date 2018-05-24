const router = require('express').Router();
const attendance = require('./attendance');
const home = require('./home');
const githubLogin = require('./github-login');
const invite = require('./invite');
const manageSt = require('./manage_student');
const viewProfile = require('./view_profile');
const passport = require('passport');
const logout = require('./logout.js');
const isAuthenticated = require('./check-outh.js');

router.get('/', home.get);
router.get('/manageSt', isAuthenticated.isAuthenticated, manageSt.get);
router.post('/deleteStudent', isAuthenticated.isAuthenticated, manageSt.delete);
router.get('/attendance', isAuthenticated.isAuthenticated, attendance.get);
router.post('/attendance/insert', attendance.insert);
router.get('/logout', logout.get);
router.post('/attendance/update', isAuthenticated.isAuthenticated, attendance.update);
router.post('/attendance/delete', isAuthenticated.isAuthenticated, attendance.delete);
router.get('/inviteSt', isAuthenticated.isAuthenticated, invite.get);
router.post('/invitebygmail', invite.getcode);
router.get('/gmail/cb', invite.gettoken);
router.get('/login', githubLogin.get);
router.get('/viewProfile/:id', viewProfile.get);
router.get('/github', githubLogin.githubInteract);
router.get('/github/cb', passport.authenticate('github', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
}), githubLogin.githubCb);


module.exports = router;
