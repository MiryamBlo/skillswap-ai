// server/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const skillsRoutes = require('./routes/skills');
const opportunitiesRoutes = require('./routes/opportunities');
const categoriesRoutes = require('./routes/categories');
const dashboardRoutes = require('./routes/dashboard'); // Add this line
const helpSuggestionsRoutes = require('./routes/helpSuggestions');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);               // Login / Register
app.use('/api/skills', skillsRoutes);           // Skills CRUD
app.use('/api/dashboard', dashboardRoutes); // Add this line
app.use('/api/categories', categoriesRoutes);   // Skill categories CRUD
app.use('/api/help-suggestions', helpSuggestionsRoutes);
// Health check endpoint
app.get('/', (req, res) => {
    res.send({ message: 'SkillSwapAI API is running 🚀' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ SkillSwapAI API running on port ${PORT}`);
});