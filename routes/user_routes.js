const { Router } = require('express');
const UserController = require('../controllers/user_controller');
const Token = require('../helpers/token');



const router = Router();

router.post('/', UserController.postUser);
router.put('/:id', UserController.UpdateUser);
router.get('/', UserController.GetAllProducts);

module.exports = router;