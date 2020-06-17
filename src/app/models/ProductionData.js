const Sequelize = require('sequelize');
const { Model } = Sequelize;

class ProductionData extends Model {
  static init(sequelize) {
    super.init(
      {
        production_date: Sequelize.DATE,
        distribuition_date: Sequelize.DATE,
        quantity: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Production, {
      foreignKey: 'production_id',
      as: 'production',
    });

    this.belongsTo(models.DistribuitionLocation, {
      foreignKey: 'location_id',
      as: 'location',
    });
  }
}

module.exports = ProductionData;
