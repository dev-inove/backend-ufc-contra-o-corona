const Sequelize = require('sequelize');
const { Model } = Sequelize;

class Need extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        link: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

module.exports = Need;
