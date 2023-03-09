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
      return res.status(401).json(error);
    }
    res.status(201).json(newOtherProducts);
  }

  static async UpdateQuantityOtherProduct(otherProductId, quantity) {
    let newOtherProductQuantity;
    let OtherProduct;

    try {
      OtherProduct = await prisma.OtherProduct.findUnique({
        where: {
          id: Number(otherProductId),
        },
      });
      const currentQuantity = OtherProduct.quantity;

      newOtherProductQuantity = await prisma.OtherProduct.update({
        where: {
          id: Number(otherProductId),
        },
        data: {
          quantity: currentQuantity + quantity,
        },
      });

      return newOtherProductQuantity.quantity;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAllOtherProducts() {
    let otherProducts;
    try {
      otherProducts = await prisma.OtherProduct.findMany({
        select: {
          name: true,
          price: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }

    return otherProducts;
  }
}

module.exports = OtherProductsController;
