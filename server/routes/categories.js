const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', categoriesController.getAllCategories);
router.post('/', authMiddleware, categoriesController.addCategory);
router.post('/', authMiddleware, categoriesController.addCategory);
router.delete('/:id', authMiddleware, categoriesController.deleteCategory);

module.exports = router;