const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', categoriesController.getAllCategories);
router.post('/', authMiddleware, categoriesController.addCategory);

module.exports = router;