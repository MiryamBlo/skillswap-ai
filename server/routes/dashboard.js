const express = require('express');
const router = express.Router();

// Example: Return some dashboard stats
router.get('/', async (req, res) => {
    // Replace with real stats as needed
    res.json({
        users: 10,
        skills: 25,
        opportunities: 5,
        categories: 7
    });
});

module.exports = router;