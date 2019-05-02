const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
//creat the root (index) route "/api", other route will start at "/api"
router.use("/api", apiRoutes);
//http:heroku website we the process.env is the production, it will bring the user to the index page
router.use((req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

module.exports = router;
