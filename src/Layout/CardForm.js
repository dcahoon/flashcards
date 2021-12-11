import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { updateCard, readCard, createCard, readDeck } from "../utils/api"

/* 
*   Parents:    index > Decks > Deck
*   
*   Children:   none
*
*   Description: Generates a form to create/edit a card and handles
*       the form submit based on the prop entered (editCard true/false)
*/

export default function CardForm({ editCard }) {

    const history = useHistory()
    const { deckId, cardId } = useParams()

    const initialFormData = {
        id: 0,
        front: "",
        back: "",
    }

    const [card, setCard] = useState({...initialFormData})
    const [deck, setDeck] = useState({ name: "Loading..."})

    useEffect(() => {

        const abortController = new AbortController()
        const { signal } = abortController

        async function getDeckFromApi() {
            try {
                const response = await readDeck(deckId, signal)
                setDeck(response)
            } catch (error) {
                if (error.message === "AbortError") {
                    console.log(error)
                } else {
                    throw error
                }
            }
        }
        getDeckFromApi()

        if (editCard) {
            async function getDeckFromApi() {
                try {
                    const cardResponse = await readCard(cardId, signal)
                    setCard(cardResponse)
                } catch (error) {
                    if (error.message === "AbortError") {
    
                    } else {
                        throw error
                    }
                }
            }
            getDeckFromApi()
        }

        return () => abortController.abort()

    }, [cardId, deckId, editCard])

    const handleChange = (event) => {    
        const value = event.target.value
        setCard({
            ...card,
            [event.target.name]: value
        })
    }

    async function handleSubmit(event) {
        
        event.preventDefault()

        const abortController = new AbortController()
        const { signal } = abortController
        
        if (editCard) {
            async function changeCardWithApi() {
                try {
                    await updateCard(card, signal)
                } catch (error) {
                    if (error.message === "AbortError") {
                        console.log(error)
                    } else {
                        throw error
                    }
                }
            }
            changeCardWithApi()
        }

        if (!editCard) {
            async function createCardWithApi() {
                try {
                    createCard(deckId, card, signal)
                } catch (error) {
                    if (error.message === "AbortError") {
                        console.log(error)
                    } else {
                        throw error
                    }
                }
            }
            createCardWithApi()
        }

        history.push(`/decks/${deckId}`)

        return () => abortController.abort()
    }


    return (
        <React.Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{editCard ? "Edit Card" : "Add Card"}</li>
                </ol>
            </nav>
            <form onSubmit={handleSubmit}>
                <h2>{editCard ? "Edit Card" : "Add Card"}</h2>
                <div>
                    <label htmlFor="front">Front:  </label>
                    <textarea
                        type="textarea"
                        name="front"
                        id="front"
                        onChange={handleChange}
                        value={card.front}
                        className="w-100"
                        rows="3"
                        placeholder="Question/Front of card"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="back">Back: </label>
                    <textarea
                        type="textarea"
                        name="back"
                        id="back"
                        onChange={handleChange}
                        value={card.back}
                        className="w-100"
                        rows="3"
                        placeholder="Answer/Back of card"
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary my-4 mx-2">
                    Save
                </button>
            </form>
        </React.Fragment>
    )
}