const router = require('express').Router();
const attendance = require('./attendance');
const home = require('./home');
const githubLogin = require('./github-login');
const invite = require('./invite');
const manageSt = require('./manage_student');
const viewProfile = require('./view_profile');


router.get('/login', githubLogin.get);
router.get('/viewProfile/:id', viewProfile.get);
router.get('/manageSt', manageSt.get);
router.post('/deleteStudent', manageSt.delete);

router.get('/github', githubLogin.githubInteract);
router.get('/github/cb', githubLogin.githubInteract, githubLogin.githubCb);
router.get('/', home.get);
router.get('/attendance', attendance.get);
// router.post('/attendance', attendance.post);
router.get('/invite', invite.get);
router.post('/invitebygmail', invite.getcode);
router.get('/gmail/cb', invite.gettoken);

module.exports = router;
