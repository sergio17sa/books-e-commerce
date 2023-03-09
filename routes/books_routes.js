const { Router } = require('express');
const BooksController = require('../controllers/books_controller');

const router = Router();

router.post('/', BooksController.PostBooks);

module.exports = router;
