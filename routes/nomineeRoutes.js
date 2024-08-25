const express = require('express');
const { getNominee, addOrUpdateNominee, deleteNominee } = require('../controllers/nomineeController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', auth, getNominee);
router.post('/', auth, addOrUpdateNominee);
router.delete('/', auth, deleteNominee);

module.exports = router;
