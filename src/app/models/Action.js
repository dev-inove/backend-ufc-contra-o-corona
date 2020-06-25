const Sequelize = require('sequelize');
const { Model } = Sequelize;

class Action extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        subtitle: Sequelize.STRING,
        content: {
          type: Sequelize.BLOB,
          get() {
            return this.getDataValue('content').toString('utf8'); // or whatever encoding is right
          },
        },
        image_url: Sequelize.STRING,
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
  }
}

module.exports = Action;
