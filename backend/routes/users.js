const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @route   POST /api/users/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findByEmail(email);
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = await User.create({ username, email, password });
        res.status(201).json({ msg: 'User registered successfully', userId: user.insertId });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/users/login
// @desc    Authenticate user and get token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const payload = { user: { id: user.id } };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;