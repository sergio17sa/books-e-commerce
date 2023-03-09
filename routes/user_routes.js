const { Router } = require('express');
const UserController = require('../controllers/user_controller');



const router = Router();

router.post('/', UserController.postUser)
router.put('/:id', UserController.UpdateUser)

module.exports = router;