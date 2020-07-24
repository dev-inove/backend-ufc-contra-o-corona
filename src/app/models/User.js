const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password_hash: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
UserSchema.plugin(uniqueValidator, {
  type: 'mongoose-unique-validator',
  message: 'Error, expected {PATH} to be unique.',
});

module.exports = mongoose.model('User', UserSchema);

// const Sequelize = require('sequelize');
// const { Model } = Sequelize;
// const bcrypt = require('bcryptjs');

// class User extends Model {
//   static init(sequelize) {
//     super.init(
//       {
//         fullname: Sequelize.STRING,
//         email: Sequelize.STRING,
//         password: Sequelize.VIRTUAL,
//         password_hash: Sequelize.STRING,
//       },
//       {
//         sequelize,
//       }
//     );

//     this.addHook('beforeSave', async (user) => {
//       if (user.password) {
//         user.password_hash = await bcrypt.hash(user.password, 8);
//       }
//     });

//     return this;
//   }

//   checkPassword(password) {
//     return bcrypt.compare(password, this.password_hash);
//   }

//   static associate(models) {
//     this.hasMany(models.Action, {
//       foreignKey: 'user_id',
//       as: 'user',
//     });
//   }
// }

// module.exports = User;
