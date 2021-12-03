import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { createCard } from "../utils/api"

export default function NewCard({ deckId }) {

    const { signal } = new AbortController()

    const initialFormData = {
        id: 0,
        front: "Question/Card Front",
        back: "Answer/Card Back",
    }

    console.log("newcard.js deckId:", deckId)

    const [newCard, setNewCard] = useState({...initialFormData})
    
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
    }

    return (

        <React.Fragment>
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
                        Create
                    </button>
                </div>
            </form>
        </React.Fragment>
    )


}

// deckId card signal

//card
// id front back deckId