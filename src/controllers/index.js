const router = require('express').Router();
const attendance = require('./attendance');
const home = require('./home');
const githubLogin = require('./github-login');
const passport = require('passport');
const logout = require('./logout.js');
const isAuthenticated = require('./check-outh.js');

router.get('/', isAuthenticated.isAuthenticated, home.get);
router.get('/login', githubLogin.get);
router.get('/github', githubLogin.githubInteract);
router.get('/github/cb', passport.authenticate('github', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
}), githubLogin.githubCb);
router.get('/logout', logout.get);
router.get('/attendance', attendance.get);


module.exports = router;
