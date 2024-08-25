const express = require('express');
const { getWallet, withdraw } = require('../controllers/walletController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', auth, getWallet);
router.post('/withdraw', auth, withdraw);

module.exports = router;
