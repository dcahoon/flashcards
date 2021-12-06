import React, { useEffect, useState } from "react"
import { deleteDeck, listDecks } from "../utils/api/index.js"
import { Link, useHistory } from "react-router-dom"

/* 
*   Parents: index > Decks
*   Children: none
*   
*   Description: Fetches a list of decks then displays the list.
*   For each deck it displays name, description, and buttons.
*/

export default function DecksList() {
    
    const [decks, setDecks] = useState([])
    const history = useHistory()

    useEffect(() => {
        
        const abortController = new AbortController()
        const { signal } = abortController
        
        async function getDecksFromAPI() {
            try{
                const response = await listDecks(signal)
                setDecks(response)
            } catch(error) {
                if (error.message === "AbortError") {
                    console.log(error)
                } else {
                    throw error
                }
            }
        }
        getDecksFromAPI()

        return () => abortController.abort()

    }, [])

    const removeDeck = (deckId) => {

        if (window.confirm("Are you sure you want to delete this deck?")) {
            const { signal } = new AbortController()
    
            try {
                deleteDeck(deckId, signal)
                console.log(`Deck ${deckId} deleted. (Decklist.js)`)
            } catch (error) {
                console.log(error)
            }
    
            history.go(0)
        }


    }

    const decksDisplay = decks.map((deck, index) => (
        <div className="card p-4 mt-4" key={index}>
            <p>Deck Id: {deck.id}</p>
            <h2 className="card-title">{deck.name}</h2>
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