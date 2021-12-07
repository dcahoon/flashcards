import React, { useEffect, useState } from "react"
import { Route, Switch, useRouteMatch, useParams } from "react-router-dom"
import Study from "./Study"
import EditDeck from "./EditDeck"
import CardForm from "./CardForm"
import DeckInfo from "./DeckInfo"
import NotFound from "./NotFound"
import { readDeck } from "../utils/api"

/* 
*   Parents:    index > Decks
*   Children:   DeckInfo, Study, CardForm
*
*   Description: Fetches a deck from the API and routes the deck
*       info accordingly based on url.
*/

export default function Deck() {

    const { path, url } = useRouteMatch()
    const { deckId } = useParams()
    const [deck, setDeck] = useState({})

    useEffect(() => {
        
        const abortController = new AbortController()
        const { signal } = abortController
        
        async function getDeck() {
            try {
                const response = await readDeck(deckId, signal)
                setDeck(response)
            } catch(error) {
                if (error.message === "AbortError") {
                    console.log(error.message)
                } else {
                    return
                }
            }
        }
        
        getDeck()

        return () => abortController.abort()

    }, [deckId, url])

    
    if (deck.id) {

        return (
            
            <React.Fragment>
                
                <Switch>
                    <Route exact path={`${path}`}>
                        <DeckInfo deck={deck} setDeck={setDeck} />
                    </Route>
                    <Route path={`${path}/study`}>
                        <Study />
                    </Route>
                    <Route exact path={`${path}/edit`}>
                        <EditDeck />
                    </Route>
                    <Route exact path={`${path}/cards/new`}>
                        <CardForm newCard={true} editCard={false} />
                    </Route>
                    <Route path={`${path}/cards/:cardId/edit`}>
                        <CardForm newCard={false} editCard={true} />
                    </Route>
                    <Route path={`${path}/*`}>
                        <NotFound />
                    </Route>
                </Switch>
    
            </React.Fragment>
        )
    }
    
    return <NotFound />



}