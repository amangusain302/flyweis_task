const Investment = require('../models/Investment');

// Get All Investments
exports.getInvestments = async (req, res, next) => {
    try {
        const investments = await Investment.find({ user: req.user.id, deletedAt: null });
        res.status(200).json(investments);
    }
    catch(err) {
        next(err);
    }
};

// Add New Investment
exports.addInvestment = async (req, res, next) => {
    try {
        const { type, amountInvested, currentValue } = req.body;

        const investment = await Investment.create({
            user: req.user.id,
            type,
            amountInvested,
            currentValue,
        });

        res.status(201).json(investment);
    }
    catch (err) {
        next(err);
    }
};

// Update Investment
exports.updateInvestment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { type, amountInvested, currentValue } = req.body;

        const investment = await Investment.findOneAndUpdate(
            { _id: id, user: req.user.id, deletedAt: null },
            { type, amountInvested, currentValue },
            { new: true }
        );

        if (!investment) {
            return res.status(404).json({ message: 'Investment not found' });
        }

        res.status(200).json(investment);
    }
    catch(err) {
        next(err);
    }
};

// Soft Delete Investment
exports.deleteInvestment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const investment = await Investment.findOneAndUpdate(
            { _id: id, user: req.user.id },
            { deletedAt: new Date() },
            { new: true }
        );

        if (!investment) {
            return res.status(404).json({ message: 'Investment not found' });
        }

        res.status(200).json({ message: 'Investment deleted' });
    }
    catch (err) {
        next(err);
    }
};
