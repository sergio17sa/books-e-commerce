const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PurchaseController {
  static async PostPurchase(req, res) {
    const { role } = req.body;
    let newPurchase;
    try {
      newPurchase = await prisma.Role.create({
        data: {
          date,
          supplierId,
          quantity,
          book,
        },
      });
    } catch (error) {
      return res.status(401).json(error);
    }
    res.status(201).json(newPurchase);
  }
}

module.exports = PurchaseController;
