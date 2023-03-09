const { PrismaClient } = require('@prisma/client');
const BooksController = require('./books_controller');
const OtherProductsController = require('./other_products_controller');
const prisma = new PrismaClient();

class StockController {
  static async PostStock(req, res) {
    const { quantity, bookId, otherProductId, supplierId, type } = req.body;
    let newStock;
    let newBookQuantity;
    let newOtherProductQuantity;
    if (bookId && otherProductId) {
      res
        .status(200)
        .json({ msg: 'The Stock register only accepts one type of product' });
    }
    try {
      newStock = await prisma.Stock.create({
        data: {
          quantity,
          bookId,
          supplierId,
          type,
          otherProductId,
        },
      });
      bookId
        ? (newBookQuantity = await BooksController.UpdateQuantityBook(
            bookId,
            quantity
          ))
        : otherProductId
        ? (newOtherProductQuantity =
            await OtherProductsController.UpdateQuantityOtherProduct(
              otherProductId,
              quantity
            ))
        : null;

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Could not create stock' });
    }
    res
      .status(200)
      .json({ stockUpdated: newStock, QuantityItemUpdated: newBookQuantity || newOtherProductQuantity});
  }

  static async getProductTotal(req, res) {
    const { id, type } = req.params;
    let stock;
    try {
      stock = await prisma.stock.findMany({
        where: {
          AND: {
            type,
          },
          OR: [{ bookId: Number(id) }, { otherProductId: Number(id) }],
        },
        select: {
          quantity: true,
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Could not get total product' });
    }

    if (stock.length > 0) {
      const total = stock.reduce((acc, item) => acc + item.quantity, 0);
      res.status(200).json({
        msg: `Total products with id: ${id} and type: ${type}`,
        total,
      });
    } else {
      res.status(200).json({
        msg: `There are not products with the id: ${id} and type: ${type}`,
      });
    }
  }
}

module.exports = StockController;
