const express = require("express");
const Router = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const config = require("config");
const PORT = config.get("PORT") || 7777;

const mainRouter = Router();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "*",
    })
  );
}

mainRouter.use("/api/bike", require("./routes/api.db.bike"));
mainRouter.use("/api/rented-bike", require("./routes/api.db.rented-bike"));
mainRouter.use("/api/bike-type", require("./routes/api.db.bike-type"));

if (process.env.NODE_ENV === "production") {
  mainRouter.use("/", express.static(path.join(__dirname, "client", "build")));
  mainRouter.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

if (process.env.NODE_ENV === "production") {
  app.use("/bike-rental/", mainRouter);
} else {
  app.use("/", mainRouter);
}
app.listen(PORT, () => {
  console.log(`Server has been started at *:${PORT}`);
});
