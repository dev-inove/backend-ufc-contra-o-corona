const Sequelize = require('sequelize');
const { Model } = Sequelize;

class Action extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        observation: Sequelize.STRING,
        target_audience: Sequelize.STRING,
        impact: Sequelize.STRING,
        content: {
          type: Sequelize.BLOB,
          get() {
            return this.getDataValue('content').toString('utf8'); // or whatever encoding is right
          },
        },
        image_url: Sequelize.STRING,
        started: Sequelize.DATE,
        ended: Sequelize.DATE,
        situation: Sequelize.STRING,
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
