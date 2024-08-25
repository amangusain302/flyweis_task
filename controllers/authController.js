const User = require('../models/User');
const generateToken = require('../config/jwt');

// Send OTP (Dummy implementation)
exports.login = async (req, res, next) => {
    try {
        const { phoneNumber } = req.body;

        let user = await User.findOne({ phoneNumber });

        if (!user) {
            user = await User.create({ phoneNumber });
        }

        // Generate and send OTP (dummy implementation here)
        const otp = '123456';
        user.otp = otp;
        await user.save();

        res.status(200).json({ message: 'OTP sent successfully' });
    }
    catch (err) {
        next(err);
    }
};

// Verify OTP
exports.verifyOtp = async (req, res, next) => {
try {
    const { phoneNumber, otp } = req.body;

    const user = await User.findOne({ phoneNumber });

    if (!user || user.otp !== otp) {
        return res.status(401).json({ message: 'Invalid OTP' });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
}
catch (err) {
    next(err);
}
};

// Logout
exports.logout = (req, res, next) => {
    res.status(200).json({ message: 'Logged out successfully' });
};
