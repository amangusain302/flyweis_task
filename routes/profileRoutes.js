const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', auth, getProfile);
router.put('/', auth, updateProfile);

module.exports = router;
