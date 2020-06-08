const Sequelize = require('sequelize');
const { Model } = Sequelize;

class Action extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        subtitle: Sequelize.STRING,
        content: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'image_id', as: 'image' });
  }
}

module.exports = Action;
