const express = require('express');
const cors = require('cors');
const CheckingDbConnection = require('../prisma/check_db_connection');

require('dotenv').config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.rolePath = '/api/role';
    this.usersPath = '/api/users';
    this.categoryPath = '/api/categories';
    this.booksPath = '/api/books';
    this.otherProductsPath = '/api/otherProducts';
    this.suppliersPath = '/api/suppliers';
    this.stockPath = '/api/stock';
    this.shoppingCartPath = '/api/shoppingCart';
    this.authPath = '/api/auth';

    this.DbConnectionCheck = CheckingDbConnection.main();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.rolePath, require('../routes/role_routes'));
    this.app.use(this.usersPath, require('../routes/user_routes'));
    this.app.use(this.categoryPath, require('../routes/category_routes'));
    this.app.use(this.booksPath, require('../routes/books_routes'));
    this.app.use(this.otherProductsPath,require('../routes/otherProducts_routes'));
    this.app.use(this.suppliersPath, require('../routes/supplier_routes'));
    this.app.use(this.stockPath, require('../routes/stock_routes'));
    this.app.use(this.shoppingCartPath,require('../routes/shoppingCart_routes'));
    this.app.use(this.authPath, require('../routes/auth_routes'));
  }

  Listen() {
    this.app.listen(this.port, () => {
      console.log(`Listen in port ${this.port}`);
    });
  }
}

module.exports = Server;
