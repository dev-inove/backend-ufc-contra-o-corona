const Sequelize = require('sequelize');
const { Model } = Sequelize;

class Production extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.ProductionData, {
      foreignKey: 'production_id',
      as: 'production',
    });
  }
}

module.exports = Production;
