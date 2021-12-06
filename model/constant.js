const mongoose = require('mongoose');

var constantSchmema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  value: {
    type: mongoose.Mixed,
    required: true,
    unique: true
  }
})

const userDoc = mongoose.model("Constants", constantSchmema);

module.exports = userDoc;