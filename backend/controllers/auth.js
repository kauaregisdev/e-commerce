const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

async function getUser(req, res) {
    res.json({
        id: req.user.id,
        role: req.user.role
    });
}

async function register(req, res) {
    try {
        const {username, password} = req.body;
        const user = new User({username, password});
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

async function login(req, res) {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(401).json({error: 'Invalid credentials.'});
        const token = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET);
        res.status(200).json({token});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

module.exports = {getUser, register, login};