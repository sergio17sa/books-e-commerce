const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const Token = require('../helpers/token');

class UserController {
  static async postUser(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      profileImage,
      roleId,
    } = req.body;

    let user;
    let token;

    const salt = bcrypt.genSaltSync();
    try {
      user = await prisma.User.create({
        data: {
          firstName,
          lastName,
          email,
          password: bcrypt.hashSync(password, salt),
          address,
          profileImage,
          roleId,
        },
      });

      token = await Token.CreateToken(user.id);
    } catch (error) {
      console.log(error);
      return res.status(401).json(error);
    }
    res.status(200).json({ user, token });
  }

  static async UpdateUser(req, res) {
    const { address, profileImage } = req.body;
    const { id } = req.params;
    let userUpdated;

    try {
      userUpdated = await prisma.User.update({
        where: {
          id: Number(id),
        },
        data: {
          address,
          profileImage,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json(error);
    }
    res.status(200).json(userUpdated);
  }
}

module.exports = UserController;
