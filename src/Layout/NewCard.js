import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { readDeck } from "../utils/api"
import CardForm from "./CardForm"

/* 
*   Parents:    index > Decks > Deck
*               index > Decks > Deck > Study
*   Children:   none
*
*   Description: 
*/

export default function NewCard() {

    const { deckId } = useParams()
    
    const [deck, setDeck] = useState({})

    useEffect(() => {
        const { signal } = new AbortController()
        async function getDeckFromApi() {
            try {
                const deckResponse = await readDeck(deckId, signal)
                setDeck(() => deckResponse)
            } catch (error) {
                console.log(error)
            }
        }
        getDeckFromApi()

    }, [deckId])
    
    
    return (

        <React.Fragment>
            <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                    </ol>
                </nav>
            <CardForm newCard={true} editCard={false} />
        </React.Fragment>
    )

}
