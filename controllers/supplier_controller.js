const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class SupplierController {
  static async PostSupplier(req, res) {
    const { name , address } = req.body;
    let newSupplier;
    try {
        newSupplier = await prisma.Supplier.create({
        data: {
          name,
          address
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json(error);
    }
    res.status(200).json(newSupplier);
  }
}

module.exports = SupplierController;
