const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    responsible: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    urlImage: { type: String, required: true },
    currentSituation: { type: String, required: true },
    sellerUrl: { type: String, required: true },
    listOfNeeds: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'NeedData',
      },
    ],
  },
  {
    timestamps: true,
  }
);
UserSchema.plugin(uniqueValidator, {
  type: 'mongoose-unique-validator',
  message: 'Error, expected {PATH} to be unique.',
});

module.exports = mongoose.model('Need', UserSchema);

// const Sequelize = require('sequelize');
// const { Model } = Sequelize;

// class Need extends Model {
//   static init(sequelize) {
//     super.init(
//       {
//         title: Sequelize.STRING,
//         subtitle: Sequelize.STRING,
//         situation: Sequelize.STRING,
//         link: Sequelize.STRING,
//         image_url: Sequelize.STRING,
//         quantity: Sequelize.INTEGER,
//         started: Sequelize.DATE,
//         ended: Sequelize.DATE,
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
//     this.belongsTo(models.Location, {
//       foreignKey: 'location_id',
//       as: 'location',
//     });
//   }
// }

// module.exports = Need;
