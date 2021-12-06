import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom"
import Decks from "./Decks"

/* 
*   Parents: none
*   Children: Decks, NotFound, Header
*/

/**
 *  DeckList <>
 *  New <>
 *  NotFound <>
 *  Deck  ->  DeckInfo <>
 *  Deck  ->  EditDeck <>
 *  Deck  ->  Study <>
 *  Deck  ->  Edit  <>
 *  Deck  ->  Cards ->  Edit <>
 *  Deck  ->  Cards ->  NewCard <> 
 */


function Layout() {
  
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path={"/"}>
            <Decks />
          </Route>
          <Route path={"/decks"}>
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
