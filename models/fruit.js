const mongoose = require('mongoose');

const fruitSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isReadyToEat: {
    type: Boolean,
    default: false,
  },
});

const Fruit = mongoose.model('Fruit', fruitSchema);

module.exports = Fruit;