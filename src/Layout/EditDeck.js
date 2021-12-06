import React, { useState, useEffect } from "react"
import { useRouteMatch, useParams, useHistory } from "react-router-dom"
import { readDeck, updateDeck } from "../utils/api"

/* 
*   Parents: index > Decks > Deck
*   Children: Edit, NewCard, Card
*
*   Description: Routes information about cards based on url.
*/

export default function EditDeck() {

    const initialDeck = {
        name: "",
        description: "",
    }
    
    const [deck, setDeck] = useState(initialDeck)
    const { url } = useRouteMatch()
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

    }, [])


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
        
        console.log("handleSubmit in EditDeck")
        
        history.push(`/decks/${deckId}`)
        
        return () => abortController.abort()
        
    }

    
    if (deck) {
        
        return (
            <React.Fragment>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Edit Deck</li>
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
                    />
                    <br/>
                    <label>
                        Description:
                    </label>
                    <br/>
                    <input
                        type="textarea"
                        name="description"
                        id="description"
                        value={deck.description}
                        onChange={handleChange}
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