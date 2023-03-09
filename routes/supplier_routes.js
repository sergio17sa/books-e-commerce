const { Router } = require('express');
const SupplierController = require('../controllers/supplier_controller');

const router = Router();

router.post('/', SupplierController.PostSupplier);

module.exports = router;
