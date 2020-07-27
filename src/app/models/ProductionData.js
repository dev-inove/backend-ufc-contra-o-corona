const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
  {
    location: {
      type: mongoose.Types.ObjectId,
      ref: 'Location',
    },

    quantity: { type: Number, required: true },
    productionDate: { type: Date, required: true },
    distributionDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);
UserSchema.plugin(uniqueValidator, {
  type: 'mongoose-unique-validator',
  message: 'Error, expected {PATH} to be unique.',
});

module.exports = mongoose.model('ProductionData', UserSchema);

// const Sequelize = require('sequelize');
// const { Model } = Sequelize;

// class ProductionData extends Model {
//   static init(sequelize) {
//     super.init(
//       {
//         production_date: Sequelize.DATE,
//         distribuition_date: Sequelize.DATE,
//         quantity: Sequelize.FLOAT,
//       },
//       {
//         sequelize,
//       }
//     );

//     return this;
//   }

//   static associate(models) {
//     this.belongsTo(models.Production, {
//       foreignKey: 'production_id',
//       as: 'production',
//     });

//     this.belongsTo(models.Location, {
//       foreignKey: 'location_id',
//       as: 'location',
//     });
//   }
// }

// module.exports = ProductionData;
