import React from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import NewCard from "./NewCard"
import Card from "./Card"
import Edit from "./Edit"

export default function Cards({ deck }) {

    const { url } = useRouteMatch()

    return (
        <Switch>
            <Route path={`${url}/:cardId/edit`}>
                <Edit />
            </Route>
            <Route path={`${url}/new`}>
                <NewCard deckId={deck.id} />
            </Route>
            <Route path={`${url}/:cardId`}>
                <Card />
            </Route>
        </Switch>
    )
}