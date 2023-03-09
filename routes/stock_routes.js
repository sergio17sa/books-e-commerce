const { Router } = require('express');
const StockController = require('../controllers/stock_controller');


const router = Router();

router.post('/',StockController.PostStock);

module.exports = router;
