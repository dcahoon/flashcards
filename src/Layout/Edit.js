import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { readDeck } from "../utils/api"
import CardForm from "./CardForm"

/* 
*   Parents:    index > Decks > Deck
*   
*   Children:   none
*
*   Description: Fetches a card from the api determined by useParams.
*       Displays a form for the user to change the card.
*/

export default function Edit() {

    const { deckId } = useParams()
    const [deck, setDeck] = useState({}) 

    useEffect(() => {
        
        const { signal } = new AbortController()

        async function getDeckFromApi() {
            
            try {
                const deckResponse = await readDeck(deckId, signal)
                setDeck(deckResponse)
            } catch (error) {
                if (error.message === "AbortError") {

                } else {
                    throw error
                }
            }
        }
        getDeckFromApi()

    }, [])

    if (deck.id) {

        return (
            <React.Fragment>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Card</li>
                    </ol>
                </nav>
                <CardForm editCard={true} newCard={false} />
            </React.Fragment>
        )

    }

    return (
        <p>Edit cards section</p>
    )
}
