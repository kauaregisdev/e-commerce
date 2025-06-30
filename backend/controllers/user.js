const User = require('../models/User');

async function getUser(req, res) {
    res.json(req.user);
}

async function deleteUser(req, res) {
    try {
        const user = await User.findOneAndDelete({
            _id: req.params.id
        });
        if (!user) return res.status(404).json({error: 'User not found.'});
        res.status(204).end();
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

module.exports = {
    getUser,
    deleteUser
};