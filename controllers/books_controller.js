const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class BooksController {
  static async PostBooks(req, res) {
    const { categoryId, ISBN, title, quantity, editorial, price } = req.body;
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

  static async UpdateQuantityBook(bookId, quantity) {
    let newBookQuantity;
    let book;

    try {
      book = await prisma.book.findUnique({
        where: {
          id: Number(bookId),
        },
      });

      const currentQuantity = book.quantity;

      newBookQuantity = await prisma.Book.update({
        where: {
          id: Number(bookId),
        },
        data: {
          quantity: currentQuantity + quantity,
        },
      });

      return newBookQuantity.quantity;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAllBooks() {
    let books;
    try {
      books = await prisma.book.findMany({
        select: {
          title: true,
          price: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
    return books;
  }
}

module.exports = BooksController;
