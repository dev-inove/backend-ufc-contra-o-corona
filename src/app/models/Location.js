const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
UserSchema.plugin(uniqueValidator, {
  type: 'mongoose-unique-validator',
  message: 'Error, expected {PATH} to be unique.',
});

// const Sequelize = require('sequelize');
// const { Model } = Sequelize;

// class Location extends Model {
//   static init(sequelize) {
//     super.init(
//       {
//         name: Sequelize.STRING,
//         street: Sequelize.STRING,
//         city: Sequelize.STRING,
//         state: Sequelize.STRING,
//       },
//       {
//         sequelize,
//       }
//     );

//     return this;
//   }

//   static associate(models) {
//     this.hasMany(models.ProductionData, {
//       foreignKey: 'location_id',
//       as: 'location',
//     });
//   }
// }

// module.exports = Location;
