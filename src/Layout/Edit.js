import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { readDeck, readCard, updateCard } from "../utils/api"

/* 
*   Parents: index > Decks > Deck
*   Children: none
*
*   Description: Fetches a card from the api determined by useParams.
*   Displays a form for the user to change the card.
*/

export default function Edit() {

    const history = useHistory()

    const { deckId, cardId } = useParams()
    const [card, setCard] = useParams({})
    const [deck, setDeck] = useState({}) 

    useEffect(() => {
        
        const { signal } = new AbortController()

        async function getDeckFromApi() {
            try {
                const deckResponse = await readDeck(deckId, signal)
                setDeck(deckResponse)
                const cardResponse = await readCard(cardId, signal)
                setCard(cardResponse)
            } catch (error) {
                console.log(error)
            }
        }
        getDeckFromApi()

    }, [])

    const handleChange = (event) => {
        
        const value = event.target.value
        setCard({
            ...card,
            [event.target.name]: value
        })
    }

    async function handleSubmit(event) {
        
        const abortController = new AbortController()
        const { signal } = abortController
    
        async function changeCardWithApi() {
            try {
                await updateCard(card, signal)
            } catch (error) {
                console.log(error)
            }
        }
        changeCardWithApi()

        history.push(`/decks/${deckId}`)

        return () => abortController.abort()

    }

    if (card) {

        return (
            <React.Fragment>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Edit Card</li>
                    </ol>
                </nav>
                <form onSubmit={handleSubmit}>
                    <h2>Edit Card {card.id}</h2>
                    <div>
                        <label htmlFor="front">Front:  </label>
                        <input
                            type="text"
                            name="front"
                            id="front"
                            onChange={handleChange}
                            value={card.front}
                            className="w-100"
                        />
                    </div>
                    <div>
                        <label htmlFor="back">Back: </label>
                        <input
                            type="text"
                            name="back"
                            id="back"
                            onChange={handleChange}
                            value={card.back}
                            className="w-100"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary my-4 mx-2">
                        Save
                    </button>
                </form>
            </React.Fragment>
        )

    }

    return (
        <p>Edit cards section</p>
    )
}
