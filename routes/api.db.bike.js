const Router = require("express");
const router = Router();
const bikeDB = require("../db/bike");

router.get("/", async (req, res) => {
  try {
    const bikes = await bikeDB.getAvailableBikes();
    res.json({ bikes });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something gone wrong while fetching bikes..." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, type, price } = req.body;
    const newBike = await bikeDB.createBike(name, type, price);
    res.json({ newBike });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something gone wrong while creating bike..." });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { bikeID } = req.body;
    await bikeDB.deleteBike(bikeID);
    res.sendStatus(200);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something gone wrong while deleting bike..." });
  }
});
module.exports = router;
