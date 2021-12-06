const constantDoc = require("../model/constant");

class ConstantDB {

  getConstantValue(constantKey) {
    console.log(constantKey);
    return constantDoc.findOne({ key: constantKey }).limit(1)
      .then(data => {
        console.log(data);
        return data ? data.value : '';
      })
  }

  saveAndUpdateConstantValue(constantKey, constantValue) {
    return constantDoc.updateOne(
      { key: constantKey },
      {
        key: constantKey,
        value: constantValue
      },
      {
        upsert: true
      }
    )
  }

}
const constantDb = new ConstantDB();
module.exports = constantDb;