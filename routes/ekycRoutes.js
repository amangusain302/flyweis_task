const express = require('express');
const { getKyc, updateKyc } = require('../controllers/ekycController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', auth, getKyc);
router.post('/', auth, updateKyc);

module.exports = router;
