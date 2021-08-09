const db = require("./index.js");

module.exports.getBikeTypes = async function () {
  try {
    const bikeTypes = await db.query("SELECT id, name FROM bike_type");
    return bikeTypes.rows;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
