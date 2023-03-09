const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CategoryController {
  static async PostCategory(req, res) {
    const { name } = req.body;
    let newCategory;
    try {
        newCategory = await prisma.Category.create({
        data: {
          name,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json(error);
    }
    res.status(200).json(newCategory);
  }
}

module.exports = CategoryController;
