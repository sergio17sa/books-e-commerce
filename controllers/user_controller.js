const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const Token = require('../helpers/token');
const BooksController = require('./books_controller');
const OtherProductsController = require('./other_products_controller');

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

  static async GetAllProducts(req, res) {
    let products;
    try {
      const [books, otherProducts] = await Promise.all([
        BooksController.getAllBooks(),
        OtherProductsController.getAllOtherProducts(),
      ]);

      products = [...books, ...otherProducts];
    } catch (error) {
      res
        .status(500)
        .json({ msg: 'there was an error trying to fetch the products' });
    }
    res.status(200).json(products);
  }
}

module.exports = UserController;
