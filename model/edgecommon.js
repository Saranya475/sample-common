const mongoose = require('mongoose');

var edgecommonSchmema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
})

const edgecommonDoc = mongoose.model("edgecommon", edgecommonSchmema);

module.exports = edgecommonDoc;