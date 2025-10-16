const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Simple matching function (replace with AI logic as needed)
async function findRelevantSuggestions({ category, title, description }) {
    // Example: Find suggestions in the same category within distance range and similar title/description
    // const result = await db.query(
    //     `SELECT * FROM help_suggestions
    //  WHERE category_id = $1
    //    AND (title ILIKE '%' || $2 || '%' OR description ILIKE '%' || $3 || '%')
    //    AND is_deleted = FALSE
    //  LIMIT 5`,
    //     [category, title, description]
    // );
    // return result.rows;
    return []; // Placeholder: always return empty for now
}

router.post('/', async (req, res) => {
    const { category, newCategory, title, description, displayDurationDays, userId } = req.body;

    try {
        let categoryId = category;

        // If newCategory is provided, insert it and get its id
        if (newCategory && newCategory.trim() !== '') {
            const catResult = await db.query(
                `INSERT INTO categories (name) VALUES ($1) RETURNING id`,
                [newCategory.trim()]
            );
            categoryId = catResult.rows[0].id;
        }

        // 1. Find relevant suggestions
        const suggestions = await findRelevantSuggestions({ category: categoryId, title, description });
        if (suggestions.length > 0) {
            // Return suggestions, do not save request
            return res.json({ suggestions });
        }

        // 2. If no suggestions, save the request
        const result = await db.query(
            `INSERT INTO help_requests (category_id, title, description, display_duration_days, user_id)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [categoryId, title, description, displayDurationDays, userId]
        );
        res.json({ request: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Failed to process request', error: err.message });
    }
});

module.exports = router;