import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { readCard, updateCard } from "../utils/api"

export default function Edit() {

    const { cardId } = useParams()
    const [card, setCard] = useState({}) 

    useEffect(() => {
        
        const { signal } = new AbortController()

        async function getCardFromApi() {
            try {
                const response = await readCard(cardId, signal)
                setCard(response)
            } catch (error) {
                console.log(error)
            }
        }
        getCardFromApi()

    }, [])

    const handleChange = (event) => {
        
        const value = event.target.value
        setCard({
            ...card,
            [event.target.name]: value
        })
    }

    async function handleSubmit(event) {
        
        const { signal } = new AbortController()
    
        async function changeCardWithApi() {
            try {
                await updateCard(card, signal)
            } catch (error) {
                console.log(error)
            }
        }
        changeCardWithApi()

    }

    if (card) {

        return (
            <React.Fragment>
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

/* export async function readCard(cardId, signal) {
export async function updateCard(updatedCard, signal) { */