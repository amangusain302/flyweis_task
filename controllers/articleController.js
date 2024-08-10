const Article = require('../models/Article');

// Create Article
exports.createArticle = async (req, res) => {
    const { title, content } = req.body;

    try {
        const article = new Article({
            title,
            content,
            author: req.user.id,
        });

        await article.save();
        res.json({success: true, article});
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Server error' });
    }
};

// Get All Articles
exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find({ delete: false }).populate('author', 'username');
        res.json({success: true, articles});
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Server error' });
    }
};

// Get Article by ID
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findOne({ _id: req.params.id, delete: false }).populate('author', 'username');
        if (!article) return res.status(404).json({success: false, msg: 'Article not found' });

        res.json({success: true, article});
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Server error' });
    }
};

// Update Article
exports.updateArticle = async (req, res) => {
    const { title, content } = req.body;

    try {
        let article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({success: false, msg: 'Article not found' });

        if (article.author.toString() !== req.user.id) {
            return res.status(401).json({success: false, msg: 'User not authorized' });
        }

        article.title = title || article.title;
        article.content = content || article.content;

        await article.save();
        res.json({success: true, article});
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Server error' });
    }
};

// Delete Article
exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({success: false, msg: 'Article not found' });

        if (article.author.toString() !== req.user.id) {
            return res.status(401).json({success: false, msg: 'User not authorized' });
        }

        await article.updateOne({
            $set: {
                delete: true
            }
        });
        res.json({ success: true, msg: 'Article removed' });
    } catch (err) {
        console.log("ERROR :", err.message)
        res.status(500).json({ success: false, msg: 'Server error' });
    }
};
