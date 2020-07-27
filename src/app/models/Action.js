const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
  {
    urlImg: { type: String, required: true },
    responsible: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    situation: { type: String, required: true },
    observation: { type: String, required: true },

    initialDate: { type: Date, required: true },
    finalDate: { type: Date, required: true },
    audience: { type: String, required: true },

    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    content: { type: String, required: true },

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

module.exports = mongoose.model('Action', UserSchema);

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
