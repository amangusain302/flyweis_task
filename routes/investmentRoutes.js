const express = require('express');
const { getInvestments, addInvestment, updateInvestment, deleteInvestment } = require('../controllers/investmentController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', auth, getInvestments);
router.post('/', auth, addInvestment);
router.put('/:id', auth, updateInvestment);
router.delete('/:id', auth, deleteInvestment);

module.exports = router;
