const db = require('../config/db');

exports.getAllSkills = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT s.*, sc.name AS category_name
       FROM skills s
       LEFT JOIN skill_categories sc ON s.category_id = sc.id
       WHERE s.is_deleted = false
       ORDER BY s.name ASC`
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addSkill = async (req, res) => {
    const { name, description, category_id } = req.body;
    if (!name) return res.status(400).json({ message: 'Skill name is required' });

    try {
        const result = await db.query(
            'INSERT INTO skills (name, description, category_id) VALUES ($1, $2, $3) RETURNING *',
            [name, description, category_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding skill:', error);
        res.status(500).json({ message: 'Server error' });
    }
};