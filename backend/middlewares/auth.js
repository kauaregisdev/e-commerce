const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({error: 'Token missing.'});

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.userId,
            role: decoded.role
        };
        next();
    } catch (err) {
        return res.status(403).json({error: 'Invalid or expired token.'});
    }
}

module.exports = authToken;