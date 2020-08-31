const mongoose = require('mongoose');

class Database {
  constructor() {
    this.init();
  }

  init() {
    try {
      mongoose.connect(process.env.DEV_CONNECTION, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      });

      console.log('Database connected!');
    } catch (e) {
      console.log("Database didn't connect!");
    }
  }
}

module.exports = new Database();
