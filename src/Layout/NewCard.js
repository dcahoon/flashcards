import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { createCard, readCard, readDeck } from "../utils/api"

/* 
*   Parents:    index > Decks > Deck
                index > Decks > Deck > Study
*   Children:   none
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
                setDeck(() => deckResponse)
                const cardResponse = await readCard(cardId, signal)
                setCard(() => cardResponse)
            } catch (error) {
                console.log(error)
            }
        }
        getDeckFromApi()

    }, [deckId, cardId])
    
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
        history.push(`/decks/${deckId}`)
    }

    return (

        <React.Fragment>
            <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                    </ol>
                </nav>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="front" className="row m-0">
                        Front: 
                    </label>
                    <textarea
                        type="text"
                        name="front"
                        id="front"
                        value={newCard.front}
                        onChange={handleChange}
                        rows="3"
                        className="w-100"
                    >
                    </textarea>
                </div>
                <div>
                    <label htmlFor="back" className="row m-0">
                        Back: 
                    </label>
                    <textarea
                        type="text"
                        name="back"
                        id="back"
                        value={newCard.back}
                        onChange={handleChange}
                        rows="3"
                        className="w-100"
                    >
                    </textarea>
                </div>
                <div className="p-3">
                    <button type="submit" className="btn btn-primary">
                        Create Card
                    </button>
                </div>
            </form>
        </React.Fragment>
    )

}
