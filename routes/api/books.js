const router = require("express").Router();
const bookController = require("../../controllers/bookController");
//full route here is "/api/books/"
//.get method will run bookController.findAll, 
//post method will run bookController.create
router.route("/")
  .get(bookController.findAll)
  .post(bookController.create);
//route: "/api/books/:id"
//get the read from db; put is update; delete is remove 
router
  .route("/:id")
  .get(bookController.findById)
  .put(bookController.update)
  .delete(bookController.remove);

module.exports = router;
