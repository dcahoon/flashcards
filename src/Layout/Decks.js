import React from "react"
import { Switch, Route } from "react-router-dom"
import New from "./New"
import Deck from "./Deck"
import DecksList from "./DecksList"
import NotFound from "./NotFound"

/* 
*   Parents: index
*   Children: DeckList, New, Deck, NotFound
*   
*   Description: Renders children based on path.
*/

export default function Decks() {

    return (
        <React.Fragment>
            <Switch>
                <Route exact path={"/"}>
                    <DecksList />
                </Route>
                <Route exact path={"/decks"}>
                    <DecksList />
                </Route>
                <Route exact path={"/decks/new"}>
                    <New />
                </Route>
                <Route path={"/decks/:deckId"}>
                    <Deck />
                </Route>
                <Route path={"/decks/*"}>
                    <NotFound />
                </Route>
            </Switch>
        </React.Fragment>
    )

}

