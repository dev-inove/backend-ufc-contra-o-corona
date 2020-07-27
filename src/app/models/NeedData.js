const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
  {
    location: {
      type: mongoose.Types.ObjectId,
      ref: 'Location',
    },

    quantity: { type: Number, required: true },
    initialDateNeeds: { type: Date, required: true },
    finalDateNeeds: { type: Date, required: true },
    mapUrl: { type: String, required: true },
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
