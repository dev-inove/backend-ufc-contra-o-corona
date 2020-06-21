const Sequelize = require('sequelize');
const { Model } = Sequelize;
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        fullname: Sequelize.STRING,
        principal_phone: Sequelize.INTEGER,
        alternative_phone: Sequelize.INTEGER,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Action, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

module.exports = User;
