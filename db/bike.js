const db = require("./index.js");

module.exports.getAvailableBikes = async function () {
  try {
    const bikes = await db.query(
      "SELECT b.id, b.name, bt.name as type, b.price FROM bike b LEFT JOIN rented_bike rb ON rb.bike_id = b.id LEFT JOIN bike_type bt ON b.type = bt.id WHERE rb.bike_id IS NULL ORDER BY b.id DESC"
    );
    return bikes.rows;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports.createBike = async function (name, type, price) {
  try {
    const newBike = await db.query(
      "WITH inserted_bike AS (INSERT INTO bike (name, type, price) VALUES ($1,$2,$3) RETURNING *) SELECT ib.id, ib.name, bt.name as type, ib.price FROM inserted_bike ib LEFT JOIN bike_type bt on ib.type = bt.id",
      [name, type, price]
    );
    return newBike.rows[0];
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports.deleteBike = async function (bikeID) {
  try {
    await db.query("DELETE FROM bike WHERE id=$1", [bikeID]);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
