const { Router } = require('express');
const ShoppingCartController = require('../controllers/shopping_cart_controller');

const router = Router();

router.post('/', ShoppingCartController.PostShoppingCart);

module.exports = router;
