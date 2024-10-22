const mongoose = require('mongoose');

const sneakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  size: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
});

const Sneaker = mongoose.model('Sneaker', sneakerSchema);
module.exports = Sneaker;
