const Sequelize = require('sequelize');
const { Model } = Sequelize;

class Need extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        subtitle: Sequelize.STRING,
        situation: Sequelize.STRING,
        link: Sequelize.STRING,
        image_url: Sequelize.STRING,
        quantity: Sequelize.INTEGER,
        started: Sequelize.DATE,
        ended: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    this.belongsTo(models.Location, {
      foreignKey: 'location_id',
      as: 'location',
    });
  }
}

module.exports = Need;
