const path = require("path");
const router = require("express").Router();
const bookRoutes = require("./books");
const googleRoutes = require("./google");
//create the "/api/books" route to bookRoutes file
router.use("/books", bookRoutes);
//create "/api/google" route to run  googleRoutes 
router.use("/google", googleRoutes);
// export router
module.exports = router;
