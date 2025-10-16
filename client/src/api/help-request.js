router.post('/', async (req, res) => {
    const { category, newCategory, title, description, displayDurationDays, userId } = req.body;
    // 1. Find relevant suggestions (AI or simple matching)
    const suggestions = await findRelevantSuggestions({ category, title, description });
    if (suggestions.length > 0) {
        // Return suggestions, do not save request
        return res.json({ suggestions });
    }
    // 2. If no suggestions, save the request
    // ...insert into help_requests table...
    const result = await db.query(
        `INSERT INTO help_requests (category_id, title, description, display_duration_days, user_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [categoryId, title, description, displayDurationDays, userId]
    );
    //{category: 5, newCategory: "", title: "גדש", description: "dsfs", displayDurationDays: 1, userId: "1"}
});