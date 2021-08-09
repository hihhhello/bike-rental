const Router = require("express");
const router = Router();
const bikeTypeDB = require("../db/bike-type");

router.get("/", async (req, res) => {
  try {
    const bikeTypes = await bikeTypeDB.getBikeTypes();
    res.json({ bikeTypes });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something gone wrong while fetching bike types..." });
  }
});

module.exports = router;
