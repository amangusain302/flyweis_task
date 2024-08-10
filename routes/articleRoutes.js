const express = require('express');
const auth = require('../middleware/auth');
const {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
} = require('../controllers/articleController');

const router = express.Router();

//Routes those are without authentication (public access)

router.get('/', getAllArticles);
router.get('/:id', getArticleById);

//Routes those requires authentication
router.use(auth);

router.post('/', createArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

module.exports = router;
