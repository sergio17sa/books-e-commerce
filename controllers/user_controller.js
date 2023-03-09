const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserController {
  static async postUser(req, res) {
    const { firstName, lastName, email, password, address, profileImage, roleId } =
      req.body;
    let user;
    try {
      user = await prisma.User.create({
        data: {
          firstName,
          lastName,
          email,
          password,
          address,
          profileImage,
          roleId
        },
      });
    } catch (error) {
      console.log(error)
      return res
        .status(401)
        .json(error);
    }
    res.status(200).json(user);
  }
}

module.exports = UserController;
