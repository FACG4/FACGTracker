const router = require('express').Router();
const attendance = require('./attendance');
const home = require('./home');
const githubLogin = require('./github-login');


router.get('/login', githubLogin.get);

router.get('/github', githubLogin.githubInteract);
router.get('/github/cb', githubLogin.githubInteract, githubLogin.githubCb);
router.get('/', home.get);
router.get('/attendance', attendance.get);
router.post('/attendance/insert', attendance.insert);
router.post('/attendance/update', attendance.update);
router.post('/attendance/delete', attendance.delete);

module.exports = router;
