const Router = require("express");
const router = Router();
const rentedBikesDB = require("../db/rented-bike");

router.get("/", async (req, res) => {
  try {
    const rentedBikes = await rentedBikesDB.getRentedBikes();
    res.json({ rentedBikes });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something gone wrong while fetching rented bikes..." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { bikeID, rentTime, price } = req.body;
    const rentPrice = rentTime > 20 ? (rentTime * price) / 2 : rentTime * price;
    const newRent = await rentedBikesDB.rentBike(bikeID, rentTime, rentPrice);
    res.json({ newRent });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something gone wrong while renting bike..." });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { rentID } = req.body;
    await rentedBikesDB.deleteRent(rentID);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something gone wrong while deleting rent..." });
  }
});
module.exports = router;
