const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class OtherProductsController {
  static async PostOtherProducts(req, res) {
    const { categoryId, name, quantity, code, price } = req.body;
    let newOtherProducts;

    try {
      newOtherProducts = await prisma.OtherProduct.create({
        data: {
          categoryId,
          name,
          quantity,
          code,
          price,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json(error);
    }
    res.status(200).json(newOtherProducts);
  }
}

module.exports = OtherProductsController;
