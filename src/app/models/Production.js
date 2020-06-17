const Sequelize = require('sequelize');
const { Model } = Sequelize;

class Production extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        subtitle: Sequelize.STRING,
        production_location: Sequelize.STRING,
        geral_production_date: Sequelize.DATE,
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

    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

module.exports = Production;
