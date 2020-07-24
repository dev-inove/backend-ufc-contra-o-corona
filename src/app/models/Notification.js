const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    topic: { type: String, required: true },
    read: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);
UserSchema.plugin(uniqueValidator, {
  type: 'mongoose-unique-validator',
  message: 'Error, expected {PATH} to be unique.',
});

module.exports = mongoose.model('Notification', UserSchema);

// const Sequelize = require('sequelize');
// const { Model } = Sequelize;

// class Notification extends Model {
//   static init(sequelize) {
//     super.init(
//       {
//         title: Sequelize.STRING,
//         content: Sequelize.STRING,
//         topic: Sequelize.STRING,
//         read: Sequelize.BOOLEAN,
//       },
//       {
//         sequelize,
//       }
//     );

//     return this;
//   }
// }

// module.exports = Notification;
