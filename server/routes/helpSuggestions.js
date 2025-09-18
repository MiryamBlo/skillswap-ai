const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', async (req, res) => {
    const {
        category,        // id if existing, name if not
        newCategory,     // name if new
        title,
        description,
        distance,
        creditCost,
        isFree,
        userId
    } = req.body;

    try {
        let categoryId = null;

        if (newCategory && newCategory.trim() !== '') {
            // Always insert new category if provided
            const catResult = await db.query(
                `INSERT INTO categories (name) VALUES ($1) RETURNING id`,
                [newCategory.trim()]
            );
            categoryId = catResult.rows[0].id;
        } else if (category) {
            // Try to parse as integer (id)
            categoryId = parseInt(category, 10);
            if (isNaN(categoryId)) {
                // If not an integer, treat as name: look up or insert
                let catResult = await db.query(
                    `SELECT id FROM categories WHERE name = $1`,
                    [category]
                );
                if (catResult.rows.length === 0) {
                    catResult = await db.query(
                        `INSERT INTO categories (name) VALUES ($1) RETURNING id`,
                        [category]
                    );
                }
                categoryId = catResult.rows[0].id;
            }
        } else {
            return res.status(400).json({ message: 'Category is required' });
        }

        const result = await db.query(
            `INSERT INTO help_suggestions 
                (category_id, title, description, distance, credit_cost, is_free, user_id, is_delete, update_timestamp)
             VALUES ($1, $2, $3, $4, $5, $6, $7, FALSE, CURRENT_TIMESTAMP)
             RETURNING *`,
            [categoryId, title, description, distance, creditCost, isFree, userId]
        );

        res.status(201).json({ message: 'Suggestion saved!', suggestion: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Failed to save suggestion', error: err.message });
    }
});

module.exports = router;