import React from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import New from "./New"
import Deck from "./Deck"
import DecksList from "./DecksList"

/* 
*   Parents: index
*   Children: DeckList, New, Deck, NotFound
*   
*   Description: Renders children based on path.
*/

export default function Decks() {

    const { path } = useRouteMatch()

    return (
        <React.Fragment>
            <Switch>
                <Route exact path={["/", `${path}decks`]}>
                    <DecksList />
                </Route>
                <Route path={`${path}decks/new`}>
                    <New />
                </Route>
                <Route path={`${path}decks/:deckId`}>
                    <Deck />
                </Route>
            </Switch>
        </React.Fragment>
    )

}

