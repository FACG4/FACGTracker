const router = require('express').Router();
const attendance = require('./attendance');
const home = require('./home');
const githubLogin = require('./github-login');


router.get('/login', githubLogin.get);

router.get('/github', githubLogin.githubInteract);
router.get('/github/cb', githubLogin.githubInteract, githubLogin.githubCb);
router.get('/', home.get);
router.get('/attendance', attendance.get);
// router.post('/attendance', attendance.post);

module.exports = router;
