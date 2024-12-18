const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const SECRET_KEY = 'your_secret_key';

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Protected route
router.get('/', verifyToken, (req, res) => {
    res.json({ message: 'Welcome to the protected route!', user: req.user });
});

module.exports = router;
