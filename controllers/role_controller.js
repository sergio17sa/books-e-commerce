const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class RoleController {
  static async PostRole(req, res) {
    const { role } = req.body;
    let newRole;
    try {
      newRole = await prisma.Role.create({
        data: {
          role,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json(error);
    }
    res.status(200).json(newRole);
  }
}

module.exports = RoleController;
