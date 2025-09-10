const db = require('../config/db');

exports.getAllOpportunities = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT o.*, u.name AS created_by_name
       FROM opportunities o
       LEFT JOIN users u ON o.created_by = u.id
       WHERE o.is_deleted = false
       ORDER BY o.created_at DESC`
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching opportunities:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createOpportunity = async (req, res) => {
    const { title, description, org_name } = req.body;
    const userId = req.user.id;

    if (!title) return res.status(400).json({ message: 'Title is required' });

    try {
        const result = await db.query(
            'INSERT INTO opportunities (title, description, org_name, created_by) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, org_name, userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating opportunity:', error);
        res.status(500).json({ message: 'Server error' });
    }
};