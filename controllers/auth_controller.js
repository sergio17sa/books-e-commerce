const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const Token = require('../helpers/token');

class AuthController {
  static async Login(req, res) {
    const { email, password } = req.body;
    let user;

    try {
      user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });
      
    } catch (error) {
      return res
        .status(500)
        .json({ msg: 'it was not possible to log in the user' });
    }

    if (!user) {
      return res.status(500).json({ msg: 'The user does not exist in db' });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res
        .status(500)
        .json({ msg: 'It was not possible to validate the password' });
    }

    const token = await Token.CreateToken(user.id);

    return res.status(200).json({ user, token });
  }
}

module.exports = AuthController;
