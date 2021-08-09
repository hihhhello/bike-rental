const db = require("./index.js");

module.exports.getRentedBikes = async function () {
  try {
    const bikes = await db.query(
      "SELECT rb.id, rb.bike_id, b.name, bt.name as type, b.price, rb.rent_time, rb.rent_price FROM rented_bike rb LEFT JOIN bike b ON b.id = rb.bike_id LEFT JOIN bike_type bt ON bt.id = b.type ORDER BY rb.id DESC"
    );
    return bikes.rows;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports.rentBike = async function (bikeID, rentTime, rentPrice) {
  try {
    const newRent = await db.query(
      "WITH inserted_rent AS (INSERT INTO rented_bike (bike_id, rent_time, rent_price) VALUES($1,$2,$3) RETURNING *) SELECT ir.id, ir.bike_id, b.name as name, bt.name as type, b.price, ir.rent_time as rent_time, ir.rent_price as rent_price FROM inserted_rent ir LEFT JOIN bike b on ir.bike_id = b.id LEFT JOIN bike_type bt ON b.type = bt.id",
      [bikeID, rentTime, rentPrice]
    );
    return newRent.rows[0];
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports.deleteRent = async function (rentID) {
  try {
    await db.query("DELETE FROM rented_bike WHERE id=$1", [rentID]);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
