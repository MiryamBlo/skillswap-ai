const db = require('../config/db');

exports.getAllCategories = async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM skill_categories WHERE is_deleted = false ORDER BY name ASC'
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addCategory = async (req, res) => {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Category name is required' });

    try {
        const result = await db.query(
            'INSERT INTO skill_categories (name, description) VALUES ($1, $2) RETURNING *',
            [name, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ message: 'Server error' });
    }
};