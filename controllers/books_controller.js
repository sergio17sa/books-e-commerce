const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class BooksController {
  static async PostBooks(req, res) {
    const {
      categoryId,
      ISBN,
      title,
      quantity,
      editorial,
      price,
    } = req.body;
    let newBook;
    
    try {
      newBook = await prisma.Book.create({
        data: {
          categoryId,
          ISBN,
          title,
          quantity,
          editorial,
          price,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json(error);
    }
    res.status(200).json(newBook);
  }
}

module.exports = BooksController;
