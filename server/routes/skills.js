const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skillsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', skillsController.getAllSkills);
router.post('/', authMiddleware, skillsController.addSkill);

module.exports = router;