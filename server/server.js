const express = require('express');
const cors = require('cors');
require('dotenv').config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usersPath = 'api/users';
    this.authPath = 'api/auth';

    //this.dbConection();

    this.middlewares();

    //this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.usersPath);
    this.app.use(this.authPath);
  }

  Listen() {
    this.app.listen(this.port, () => {
      console.log(`Listen in port ${this.port}`);
    });
  }
}

module.exports = Server;
