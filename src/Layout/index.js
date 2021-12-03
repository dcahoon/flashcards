import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom"
import Decks from "./Decks"

function Layout() {
  
  
  
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path={["/", "/decks"]}>
            <Decks />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        
      </div>
    </React.Fragment>
  );
}

export default Layout;
