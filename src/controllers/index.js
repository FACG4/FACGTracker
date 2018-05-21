const router = require('express').Router();
const githubLogin = require('./github-login');


router.get('/login', githubLogin.get);

router.get('/github', githubLogin.githubInteract);
router.get('/github/cb', githubLogin.githubInteract, githubLogin.githubCb);


module.exports = router;
