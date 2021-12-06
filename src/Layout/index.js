import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom"
import Decks from "./Decks"

/* 
*   Parents:
*   Children: Decks, NotFound
*/


function Layout() {
  
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path={"decks"}>
            <Decks />
          </Route>
          <Route path={"/"}>
            <Decks />
          </Route>
          <Route path={"/*"}>
            <NotFound />
          </Route>
        </Switch>
        
      </div>
    </React.Fragment>
  );
}

export default Layout;
