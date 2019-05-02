//import React from react to make react in scope to use JSX
import React from "react";
//import routing components: BrowserRouter, Router, Route and Switch from react-router-dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import Home from home.js. Saved from Saved.js, NoMatch from NoMatch.js and Nav from Nav folder
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/saved" component={Saved} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
