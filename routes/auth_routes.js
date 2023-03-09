const { Router } = require('express');
const AuthController = require('../controllers/auth_controller');
const BooksController = require('../controllers/books_controller');

const router = Router();

router.post('/login', AuthController.Login);

module.exports = router;
