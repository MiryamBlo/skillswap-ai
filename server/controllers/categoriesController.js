const db = require('../config/db');

exports.getAllCategories = async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM categories WHERE is_deleted = false ORDER BY name ASC'
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Category name is required' });

    try {
        const result = await db.query(
            'INSERT INTO categories (name) VALUES ($1) RETURNING *',
            [name]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const result = await db.query(
            'UPDATE categories SET is_deleted = true WHERE id = $1 RETURNING *',
            [req.params.id]
        );
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Server error' });
    }
}