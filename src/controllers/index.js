const express = require('express');
const attendance = require('./attendance');
const home = require('./home');

const router = express.Router();

router.get('/', home.get);
router.get('/attendance', attendance.get);
router.post('/attendance', attendance.post);

module.exports = router;
