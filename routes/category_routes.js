const { Router } = require('express');
const CategoryController = require('../controllers/category_controller');

const router = Router();

router.post('/', CategoryController.PostCategory);

module.exports = router;
