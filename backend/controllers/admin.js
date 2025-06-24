const User = require('../models/User');

async function getUsers(req, res) {
    const users = await User.find();
    res.json(users);
}

module.exports = getUsers;