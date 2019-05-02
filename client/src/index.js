//impot React, using JSX need react in scope 
import React from "react";
// import ReactDom from react-dom to use render() method
import ReactDOM from "react-dom";
//import App from App.js file
import App from "./App";
//import registerServerWorker from registerServiceWorker file
import registerServiceWorker from "./registerServiceWorker";
//render(<App />)
ReactDOM.render(<App />, document.getElementById("root"));
//It shoulde be 
// serviceWorker.unregister();
