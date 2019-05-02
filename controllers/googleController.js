//import axios and db
const axios = require("axios");
const db = require("../models");
//module.export an object
module.exports = {
  //findAll is the key
  findAll: function (req, res) {
    console.log(req);
    const { query: params } = req;
    //the val of paramsis q:title:+q
    console.log("------")
    console.log(params);
    console.log("-------")
    //get the axios call the api URL ans pass the title as query
    axios
      .get("https://www.googleapis.com/books/v1/volumes", {
        params
      })
      .then(results =>
        // {console.log("-------------")
        // console.log(results.data.items[0].volumeInfo);
        // console.log("-------------");
        //when get the results back, add the filter method to select all the results which having 
        //the title, inforlink, authos, description, imagelinks and imagelinks.thumnail
        results.data.items.filter(
          result =>
            result.volumeInfo.title &&
            result.volumeInfo.infoLink &&
            result.volumeInfo.authors &&
            result.volumeInfo.description &&
            result.volumeInfo.imageLinks &&
            result.volumeInfo.imageLinks.thumbnail
        )
      )
      // and then taking these results go to 
      //the db to find match books, . 
      .then(apiBooks => 
        {
        console.log("KKKKKKKKKKK");
        // console.log(apiBooks);
        // console.log(db);
        return db.Book.find().then(dbBooks =>
          apiBooks.filter(apiBook =>
            //Find all the books in db, and using the filter to get the apibooks which googleId id not found in bdset the apiBook id =the googleId in the book collection
            dbBooks.every(dbBook => dbBook.googleId.toString() !== apiBook.id)
          )
        )
      }
      )
      // then sends the books as json files to client 
      .then(books => {
        console.log(books)
        res.json(books)
      })
      // err handling
      .catch(err => res.status(422).json(err));
  }
};
