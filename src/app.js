require('dotenv').config();
const express = require('express');
require('./database');

const routes = require('./routes');

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  routes() {
    this.server.use(routes);
  }

  middlewares() {
    this.server.use(express.json());
  }
}

module.exports = new App().server;
