const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

const router = express.Router();

/* -------------------- REGISTER -------------------- */
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('📩 Incoming register request:', { name, email });

    try {
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            console.log('⚠️ Registration failed: Email already exists');
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('🔑 Password hashed successfully');

        const newUser = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, hashedPassword]
        );
        console.log('✅ New user created with ID:', newUser.rows[0].id);

        const token = jwt.sign(
            { id: newUser.rows[0].id, email: newUser.rows[0].email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        console.log('🎟️ JWT token generated');

        res.json({ token, user: newUser.rows[0] });

    } catch (err) {
        console.error('❌ Server error during registration:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

/* -------------------- LOGIN -------------------- */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('📩 Incoming login request:', { email });

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            console.log('⚠️ Login failed: User not found');
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        console.log('👤 User found with ID:', user.rows[0].id);

        const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!validPassword) {
            console.log('⚠️ Login failed: Incorrect password');
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        console.log('🔑 Password verified successfully');

        const token = jwt.sign(
            { id: user.rows[0].id, email: user.rows[0].email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        console.log('🎟️ JWT token generated for user:', user.rows[0].id);

        res.json({
            token,
            user: { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email }
        });

    } catch (err) {
        console.error('❌ Server error during login:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;