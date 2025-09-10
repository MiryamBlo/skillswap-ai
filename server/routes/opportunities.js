const express = require('express');
const router = express.Router();
const opportunitiesController = require('../controllers/opportunitiesController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', opportunitiesController.getAllOpportunities);
router.post('/', authMiddleware, opportunitiesController.createOpportunity);

module.exports = router;