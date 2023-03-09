const jwt = require('jsonwebtoken');
const { sign } = require('jsonwebtoken');

class Token {
  static async CreateToken(id) {
    const payload = { id };

    try {
      const token = sign(payload, process.env.KEY_TOKEN, {
        expiresIn: '72h',
      });

      return token;
    } catch (error) {
      throw error;
    }
  }

  static decryptJWT(req, res, next) {
    let token;
    try {
      const authorization = req.get('Authorization');
      if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
      }
      if (!token) {
        return res.status(401).json({ msg: 'invalid token' });
      }
      const decodeToken = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
      next();
    } catch (error) {
      return error;
    }
  }
}

module.exports = Token;
