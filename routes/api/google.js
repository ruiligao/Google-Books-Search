// add the dependence
const router = require("express").Router();
//import the googleConntroller from the folde 
const googleController = require("../../controllers/googleController");

router
//set the "/" to get the googleConntroller
  .route("/")
  .get(googleController.findAll);

module.exports = router;
