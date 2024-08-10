const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const source = req.header('x-source');

    // Check source header
    if (!source || source !== 'android-app') {
        return res.status(400).json({ success: false, msg: 'Invalid request source' });
    }

    try {
        let user = await User.findOne({ email, delete: false });
        if (user) return res.status(400).json({ success: false, msg: 'User already exists' });
        let isUsernameExist = await User.findOne({ username, delete: false });
        if (isUsernameExist) return res.status(400).json({ success: false, msg: 'Username already exists' });

        user = new User({
            username,
            email,
            password: await bcrypt.hash(password, 10),
        });

        await user.save();

        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({success : true, token });
    } catch (err) {
        console.log("ERROR :", err.message)
        res.status(500).json({ success: false, msg: 'Server error' });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    const source = req.header('x-source');

    // Check source header
    if (!source || source !== 'android-app') {
        return res.status(400).json({success: false, msg: 'Invalid request source' });
    }

    try {
        const user = await User.findOne({ email, delete: false });
        if (!user) return res.status(400).json({success: false, msg: 'User does not exist' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({success: false, msg: 'Invalid credentials' });

        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({success : true, token });
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Server error' });
    }
};


exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({success : true, user});
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Server error' });
    }
};
