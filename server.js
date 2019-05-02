//impot express
const express = require("express");
//impot mongoose 
const mongoose = require("mongoose");
// import routes from folder routes
const routes = require("./routes");
//set the application on express
const app = express();
//set the PORT to process.env.PORT OR 3001 if it is 3001, in the pakageJson, proxy should set 3001 as the same
const PORT = process.env.PORT || 3001;

//use midleware function for handling the post data, the data is the plain text, need transfer json objects
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//for the production, set the satic file to "client/build"
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
//will go to the routes 
app.use(routes);
//set the mongoose connect in the heroku required way 
mongoose.connect(
  //if we're production env, use the URI provided by mlab, if not, googlebooks is the dbname local to our machines
  process.env.MONGODB_URI || "mongodb://localhost/googlebooks",
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);
//set the app listen on the localhost:PORT
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
