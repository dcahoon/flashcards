import React from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import NewCard from "./NewCard"
import Edit from "./Edit"

/* 
*   Parents: index > Decks > Deck
*   Children: Edit, NewCard, Card
*
*   Description: Routes information about cards based on url.
*/

export default function Cards({ deck }) {

    const { url, path } = useRouteMatch()

    return (
        <Switch>
            <Route path={`${path}/:cardId/edit`}>
                <Edit />
            </Route>
            <Route path={`${path}/new`}>
                <NewCard deckId={deck.id} />
            </Route>
        </Switch>
    )
}