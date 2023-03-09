const { Router} = require('express');
const RoleController = require('../controllers/role_controller');

const router = Router();

router.post('/',RoleController.PostRole )

module.exports = router;