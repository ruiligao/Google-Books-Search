//need use axios to hit the api, so here need to imporm axio
import axios from "axios";
//export default an object
export default {
  //getBooks is the key, and the value is a function, which passes the q and function is a axios api call by get method,
  // the route is  "/api/google", pass the "title" + q as params 
  getBooks: function(q) {
    console.log(q);
    console.log("title:"+q)
    // this route should be "localhost:3000/api/google", will search on localhost 3000to find this route, if not fund will search in 3001 by proxy setting 
    return axios.get("/api/google", { params: { q: "title:" + q } });
  },
  //getSavedBooks function will return the axios call, here the route is "apl/books"
  getSavedBooks: function() {
    return axios.get("/api/books");
  },
  //will send the delete req by the route:("/api/books/" +id) 
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  //saveBook will return the axio call api to post to db, the route is "/api/books" data need to pass is bookData 
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
