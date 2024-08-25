const express = require('express');
const { login, verifyOtp, logout } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/verify', verifyOtp);
router.post('/logout', logout);

module.exports = router;
