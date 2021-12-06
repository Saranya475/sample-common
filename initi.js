const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

function connectDB() {
  try {
    return mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = connectDB;
