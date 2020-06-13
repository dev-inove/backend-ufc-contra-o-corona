const Sequelize = require('sequelize');
const { Model } = Sequelize;

class ProductionData extends Model {
  static init(sequelize) {
    super.init(
      {
        data: Sequelize.STRING,
        value: Sequelize.FLOAT,
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
  }
}

module.exports = ProductionData;
