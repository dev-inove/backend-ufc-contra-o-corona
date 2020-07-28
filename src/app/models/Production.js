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
    situation: { type: String, required: true },
    listOfProductions: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'ProductionData',
      },
    ],

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

module.exports = mongoose.model('Production', UserSchema);

// const Sequelize = require('sequelize');
// const { Model } = Sequelize;

// class Production extends Model {
//   static init(sequelize) {
//     super.init(
//       {
//         title: Sequelize.STRING,
//         subtitle: Sequelize.STRING,
//         situation: Sequelize.STRING,
//       },
//       {
//         sequelize,
//       }
//     );

//     return this;
//   }

//   static associate(models) {
//     this.hasMany(models.ProductionData, {
//       foreignKey: 'production_id',
//       as: 'production',
//     });

//     this.belongsTo(models.User, {
//       foreignKey: 'user_id',
//       as: 'user',
//     });
//   }
// }

// module.exports = Production;
