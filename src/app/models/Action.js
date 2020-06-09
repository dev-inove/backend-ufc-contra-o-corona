const Sequelize = require('sequelize');
const { Model } = Sequelize;

class Action extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        subtitle: Sequelize.STRING,
        content: Sequelize.BLOB,
        imageURL: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

module.exports = Action;
