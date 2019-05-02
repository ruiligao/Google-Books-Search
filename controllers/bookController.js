const db = require("../models");

module.exports = {
  //findAll method will search all the books in db
  findAll: function(req, res) {
    
    db.Book.find(req.query)
    //will send the json back to client as promise
      .then(dbBook => res.json(dbBook))
      //err handling
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Book.findById(req.params.id)
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  },
  //post to db 
  create: function(req, res) {
    // console.log("lllll")
    // console.log(req.body)
    // console.log("lllll")
    db.Book.create(req.body)
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  },
  //handle update usingfindOneAndUpdate method, find the one have id ===req.pargams.id
  update: function(req, res) {
    
    db.Book.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  },
  //this handle the delete req
  remove: function(req, res) {
    //find the id in db
    db.Book.findById(req.params.id)
    //then db.book.remove()
      .then(dbBook => dbBook.remove())
      //send back 
      .then(dbBook => res.json(dbBook))
      //err handling
      .catch(err => res.status(422).json(err));
  }
};
