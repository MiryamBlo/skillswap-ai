const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find user
        const userResult = await db.query(
            'SELECT * FROM users WHERE email = $1 AND is_deleted = false',
            [email]
        );
        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = userResult.rows[0];

        // 2. Check password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 3. Get user skills
        const skillsResult = await db.query(
            `SELECT s.id, s.name, s.description, sc.name AS category_name,
              us.is_free, us.price, us.experience_level, us.years_experience, us.details, us.comments
       FROM user_skills us
       JOIN skills s ON us.skill_id = s.id
       LEFT JOIN skill_categories sc ON s.category_id = sc.id
       WHERE us.user_id = $1 AND us.is_deleted = false`,
            [user.id]
        );

        // 4. Create JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // 5. Return user + skills + token
        res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                skills: skillsResult.rows
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};