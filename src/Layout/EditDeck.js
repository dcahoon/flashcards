import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { readDeck, updateDeck } from "../utils/api"

/* 
*   Parents: index > Decks > Deck
*   Children: none
*
*   Description: Routes information about cards based on url.
*/

export default function EditDeck() {

    const initialDeck = {
        name: "",
        description: "",
    }
    
    const [deck, setDeck] = useState(initialDeck)
    const { deckId } = useParams()
    const history = useHistory()

    useEffect(() => {

        const abortController = new AbortController()
        
        const { signal } = abortController

        async function loadDeck() {
            try {
                const response = await readDeck(deckId, signal)
                setDeck(response)
            } catch (error) {
                console.log(error)
                if (error.name === "AbortError") {
                    console.log("Aborted", deckId)
                }
                throw error
            }
        }

        loadDeck()

        return () => abortController.abort()

    }, [deckId])


    const handleChange = ({ target }) => {
        const value = target.value
        setDeck(() => ({
            ...deck,
            [target.name]: value,
        }))
    }

    const handleSubmit = (event) => {

        const abortController = new AbortController()
        const { signal } = abortController
    
        async function changeDeckInfoWithApi() {
            
            try {
                await updateDeck(deck, signal)
            } catch (error) {
                if (error.message === "AbortError") {
                    console.log(error)
                } else {
                    throw error
                }
            }

        }
        
        changeDeckInfoWithApi()
        
        history.push(`/decks/${deckId}`)
        
        return () => abortController.abort()
        
    }

    
    if (deck) {
        
        return (
            <React.Fragment>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                    </ol>
                </nav>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">
                        Name:
                    </label>
                    <br/>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={deck.name}
                        onChange={handleChange}
                        className="w-100"
                    />
                    <br/>
                    <label>
                        Description:
                    </label>
                    <br/>
                    <textarea
                        type="textarea"
                        name="description"
                        id="description"
                        value={deck.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-100"
                    />
                    <br/>
                    <button type="submit" className="btn btn-primary my-3">
                        Submit
                    </button>
                </form>
            </React.Fragment>
        )

    }

    return "Loading..."
    
}