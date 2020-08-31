const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    // read: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);
UserSchema.plugin(uniqueValidator, {
  type: 'mongoose-unique-validator',
  message: 'Error, expected {PATH} to be unique.',
});

module.exports = mongoose.model('Category', UserSchema);

// const Sequelize = require('sequelize');
// const { Model } = Sequelize;

// class Action extends Model {
//   static init(sequelize) {
//     super.init(
//       {
//         title: Sequelize.STRING,
//         subtitle: Sequelize.STRING,
//         content: {
//           type: Sequelize.BLOB,
//           get() {
//             return this.getDataValue('content').toString('utf8'); // or whatever encoding is right
//           },
//         },
//         image_url: Sequelize.STRING,
//       },
//       {
//         sequelize,
//       }
//     );

//     return this;
//   }

//   static associate(models) {
//     this.belongsTo(models.User, {
//       foreignKey: 'user_id',
//       as: 'user',
//     });
//   }
// }

// module.exports = Action;
