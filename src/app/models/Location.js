const Sequelize = require('sequelize');
const { Model } = Sequelize;

class Location extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.ProductionData, {
      foreignKey: 'location_id',
      as: 'location',
    });
  }
}

module.exports = Location;
