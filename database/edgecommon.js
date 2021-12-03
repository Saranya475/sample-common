const edgecommonDoc = require("../model/edgecommon");

class EdgeCommonDB {

 async getValue(value) {

    try {
        const resp = await edgecommonDoc.countDocuments({ "name": value })
          return resp;
      } catch (error) {
        console.log(error);
      }
  }

  saveAndUpdateConstantValue(constantKey, constantValue) {
    return edgecommonDoc.updateOne(
      { name: constantKey },
      {
        name: constantKey,
        id: constantValue
      },
      {
        upsert: true
      }
    )
  }

}
const edgecommonDb = new EdgeCommonDB();
module.exports = edgecommonDb;