import React, { useState, useEffect } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { createCard, readCard, readDeck } from "../utils/api"

/* 
*   Parents: index > Decks > Deck 
*   Children: none
*
*   Description: 
*/

export default function NewCard() {

    const { deckId, cardId } = useParams()
    const history = useHistory()
    const { signal } = new AbortController()
    const initialFormData = {
        id: 0,
        front: "Question/Card Front",
        back: "Answer/Card Back",
    }

    const [newCard, setNewCard] = useState({...initialFormData})
    const [card, setCard] = useState({})
    const [deck, setDeck] = useState({})

    useEffect(() => {

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
    
    const handleChange = ({ target }) => {
        const value = target.value
        setNewCard({
            ...newCard,
            [target.name]: value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        createCard(deckId, newCard, signal)
        console.log("card added, deckId:", deckId)
        history.push(`/decks/${deckId}`)
    }

    return (

        <React.Fragment>
            <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Add Card</li>
                    </ol>
                </nav>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="front">
                        Front: 
                        <input
                            type="text"
                            name="front"
                            id="front"
                            value={newCard.front}
                            onChange={handleChange}
                        >
                        </input>
                    </label>
                </div>
                <div>
                    <label htmlFor="back">
                        Back: 
                        <input
                            type="text"
                            name="back"
                            id="back"
                            value={newCard.back}
                            onChange={handleChange}
                        >
                        </input>
                    </label>
                </div>
                <div>
                    
                    <button type="submit" className="btn btn-primary">
                        Create Card
                    </button>
                    
                </div>
            </form>
        </React.Fragment>
    )

}
