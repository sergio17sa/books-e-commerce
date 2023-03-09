const { Router } = require('express');
const OtherProductsController = require('../controllers/other_products_controller');

const router = Router();

router.post('/', OtherProductsController.PostOtherProducts);

module.exports = router;
