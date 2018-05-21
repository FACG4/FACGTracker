const express = require('express');
const attendance = require('./attendance');

const router = express.Router();

router.get('/attendance', attendance.get);
router.post('/attendance', attendance.post);

module.exports = router;
