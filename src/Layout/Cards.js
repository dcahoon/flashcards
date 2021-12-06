import React from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import NewCard from "./NewCard"
import Edit from "./Edit"
import NotFound from "./NotFound"

/* 
*   Parents: index > Decks > Deck
*   Children: Edit, NewCard
*
*   Description: Routes information about cards based on url.
*/

export default function Cards({ deck }) {

    const { path } = useRouteMatch()

    return (
        <Switch>
            <Route exact path={`${path}`}>
                <NewCard deckId={deck.id} />
            </Route>
            <Route path={`${path}/edit`}>
                <Edit />
            </Route>
            <Route path={`${path}/*`}>
                <NotFound />
            </Route>
        </Switch>
    )
}