const express = require('express');
const { getBanks, addBank, updateBank, deleteBank } = require('../controllers/bankController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', auth, getBanks);
router.post('/', auth, addBank);
router.put('/:id', auth, updateBank);
router.delete('/:id', auth, deleteBank);

module.exports = router;
