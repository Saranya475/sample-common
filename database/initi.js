// var MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

// Connect to the db
function connectDB()
{
  try
  {
    mongoose.connect("mongodb://localhost:27017/Test")
      //   function (err, db) {
    
  //     db.collection('sample', function (err, collection) {
          
  //         collection.insert({"name":"lokshitha","id":"3" });
          
  //         db.collection('sample').count(function (err, count) {
  //             if (err) throw err;
              
  //             console.log('Total Rows: ' + count);
  //         });
  //     });
                  
  // });
  }
  catch (error) {
    throw new Error(error);
  }
}
module.exports = connectDB;