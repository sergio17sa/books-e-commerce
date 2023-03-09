const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class StockController {
  static async PostStock(req, res) {
    const { quantity, bookId, otherProductId, supplierId } = req.body;
    let newStock;
    if( bookId && otherProductId ){
      res.status(200).json({msg: "The Stock register only accepts one type of product"})
    }
    try {
        newStock = await prisma.Stock.create({
          data: {
            quantity,
            bookId,
            supplierId,
          },
        });
      
    } catch (error) {
      console.log(error);
      return res.status(401).json(error);
    }
    res.status(200).json(newStock);
  }
}

module.exports = StockController;
