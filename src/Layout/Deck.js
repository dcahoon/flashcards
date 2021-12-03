import React, { useEffect, useState } from "react"
import { Link, Route, Switch, useRouteMatch, useParams } from "react-router-dom"
import Study from "./Study"
import Edit from "./Edit"
import Cards from "./Cards"
import DeckInfo from "./DeckInfo"
import { readDeck } from "../utils/api"

export default function Deck() {

    const { path } = useRouteMatch()
    const { deckId } = useParams()
    const [deck, setDeck] = useState({})

    useEffect(() => {
        
        async function getDeck() {
            
            const { signal } = new AbortController()
            
            try {
                const response = await readDeck(deckId, signal)
                setDeck(response)
                
            } catch(error) {
                console.log(error.message)
            }

        }
        
        getDeck()
        console.log("inside deck.js deckId:", deckId)

    }, [path])

    
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
                    <Route path={`${path}/edit`}>
                        <Edit />
                    </Route>
                    <Route path={`${path}/cards`}>
                        <Cards deck={deck} />
                    </Route>
                </Switch>
    
            </React.Fragment>
        )
    }
    
    return "Loading..."




}