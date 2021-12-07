import React, { useState, useEffect } from "react"
import { Link, useRouteMatch, useHistory, useParams } from "react-router-dom"
import { deleteDeck, deleteCard, readDeck } from "../utils/api"

/* 
*   Parents: index > Decks > Deck
*   Children: none
*   
*   Description: Displays information about the deck and options to
*   edit, study, or delete the deck. It also displays a list of all
*   the cards in the deck which have buttons to edit or delete the
*   card.
*/

export default function DeckInfo() {

    const { url } = useRouteMatch()
    const { deckId } = useParams()
    const history = useHistory()

    const [deck, setDeck] = useState({})

    useEffect(() => {

        const abortController = new AbortController()
        const { signal } = abortController
        
        async function getDeck() {
            
            try {
                const response = await readDeck(deckId, signal)
                setDeck(response)
                
            } catch(error) {
                console.log(error.message)
            }

        }
        
        getDeck()
        
        return () => abortController.abort()

    }, [])
    
    const handleDeleteCard = (event, cardId) => {
        
        event.preventDefault()
        
        // Only run function after prompting user.
        if (window.confirm("Are you sure you want to delete this card?")) {

            async function deleteCardFromApi() {
                
                const abortController = new AbortController()
                const { signal } = abortController
                
                try {
                    const response = await deleteCard(cardId, signal)
                    console.log(response)
                } catch(error) {
                    if (error.name === "AbortError") {
                        console.log("Aborted")
                    } else {
                        throw error
                    }
                }
        
                // Reload the deck after card is deleted.
                try {
                    const response = await readDeck(deckId, signal)
                    setDeck(response)            
                } catch(error) {
                    console.log(error.message)
                }
        
            }
            deleteCardFromApi()
            history.go(0)
        }
    }

    async function handleDeleteDeck(deckId) {

        if (window.confirm("Are you sure you want to delete this deck?")) {
            const { signal } = new AbortController()
    
            try {
                deleteDeck(deckId, signal)
            } catch (error) {
                console.log(error.message)
            }
    
            history.push("")
        }

    }
    
    if (deck.id) {
        
        const content = deck.cards.map((card, index) => (
            <div className="card p-4 my-4" key={index}>
                <div className="row">
                    <div className="col">
                        <h5 className="card-title">Front:</h5>
                        <p className="card-text">{card.front}</p>
                    </div>
                    
                    <div className="col">
                        <h5 className="card-title">Back:</h5>
                        <p className="card-text">{card.back}</p>
                    </div>                   
                </div>
                
                <div className="mt-2">
                    <Link className="btn btn-dark" to={`${url}/cards/${card.id}/edit`}>
                        <span className="oi oi-pencil"></span> Edit Card
                    </Link>
                    <button className="btn btn-danger float-right" onClick={(event) => handleDeleteCard(event, card.id)}>
                            <span className="oi oi-trash"></span> Delete Card
                    </button>
                </div>
    
            </div>
        ))
        
        return (
            <React.Fragment>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item"><a href="/decks">Decks</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                    </ol>
                </nav>
                <h1>{deck.name}</h1>
                <h4>({deck.cards.length} cards)</h4>
                <p>{deck.description}</p>
                <div className="my-4">
                    <Link to={`${url}/edit`} className="btn btn-dark mx-2">
                        <span className="oi oi-pencil"></span> Edit Deck
                    </Link>
                    <Link to={`${url}/study`} className="btn btn-info mx-2">
                        <span className="oi oi-book"></span> Study
                    </Link>
                    <Link to={`${url}/cards/new`} className="btn btn-primary mx-2">
                        <span className="oi oi-plus"></span> Add Card
                    </Link>
                    <button className="btn btn-danger mx-2 float-right" onClick={() => handleDeleteDeck(deck.id)}>
                        <span className="oi oi-trash"></span> Delete Deck
                    </button>
                </div>
                <h2>Cards</h2>
                {content}
            </React.Fragment>
        )
    }

    return "Loading..."

}