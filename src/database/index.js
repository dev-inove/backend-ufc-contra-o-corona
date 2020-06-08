const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../app/models/User');
const Action = require('../app/models/Action');
const Need = require('../app/models/Need');
const File = require('../app/models/File');

const models = [User, Action, Need, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    try {
      this.connection = new Sequelize(dbConfig);
      models
        .map((model) => model.init(this.connection))
        .map(
          (model) => model.associate && model.associate(this.connection.models)
        );

      console.log('Database connected!');
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new Database();
