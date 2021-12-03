import React, { useEffect, useState } from "react"
import { deleteDeck, listDecks } from "../utils/api/index.js"
import { Link } from "react-router-dom"

export default function DecksList() {
    
    const [decks, setDecks] = useState([])

    //const  { path } = useHistory()

    useEffect(() => {
        
        const abortController = new AbortController()
        
        async function getDecksFromAPI() {
            
            try{
                const response = await listDecks(abortController.signal)
                setDecks(response)
            } catch(error) {
                console.log(error.message)
            }

        }

        getDecksFromAPI()

    }, [decks])

    const removeDeck = (deckId) => {

        const { signal } = new AbortController()

        try {
            deleteDeck(deckId, signal)
        } catch (error) {
            console.log(error)
        }

    }

    const decksDisplay = decks.map((deck) => (
        <div className="card p-4 mt-4">
            <h5 className="card-title">{deck.name}</h5>
            <p className="card-text">{deck.description}</p>
            <div>
                <Link className="btn btn-dark" to={`/decks/${deck.id}`}>
                    <span className="oi oi-list"></span> View
                </Link>
                <Link className="btn btn-info mx-2" to={`/decks/${deck.id}/study`}>
                    <span className="oi oi-magnifying-glass"></span> Study
                </Link>
                <button className="btn btn-danger float-right" onClick={() => removeDeck(deck.id)}>
                    <span className="oi oi-trash"></span>
                </button>
            </div>
        </div>
    ))

    return (
        <div>
            <Link to={`/decks/new`} className="btn btn-dark">
                <span className="oi oi-plus"></span> Add Deck
            </Link>
            
            {decksDisplay}
        </div>
    )
}