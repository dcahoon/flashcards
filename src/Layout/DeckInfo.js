import React from "react"
import { Link, useRouteMatch, useHistory, useParams } from "react-router-dom"
import { deleteDeck, deleteCard, readDeck } from "../utils/api"
// deleteDeck(deckId, signal)
// deleteCard(cardId, signal)

export default function DeckInfo({ deck, setDeck }) {

    const { url, path } = useRouteMatch()
    const { deckId } = useParams()
    const history = useHistory()

    async function handleDeleteCard(cardId) {
        
        const { signal } = new AbortController()
        
        try {
            deleteCard(cardId, signal)
        } catch(error) {
            if (error.name === "AbortError") {
                console.log("Aborted")
            } else {
                throw error
            }
        }

        console.log(cardId, deckId, "deleted")

        try {
            const response = await readDeck(deckId, signal)
            setDeck(response)
            
        } catch(error) {
            console.log(error.message)
        }

        history.push(url)

    }

    function handleDeleteDeck(deckId) {

        const { signal } = new AbortController()

        try {
            deleteDeck(deckId, signal)
        } catch (error) {
            console.log(error.message)
        }

    }

    const content = deck.cards.map((card) => (
        <div className="card p-4 my-4">
            
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
            
            <div>
                <Link className="btn btn-dark" to={`${url}/cards/${card.id}/edit`}>
                    <span className="oi oi-pencil"></span> Edit
                </Link>
                <button className="btn btn-danger float-right" onClick={() => handleDeleteCard(card.id)}>
                        <span className="oi oi-trash"></span>
                </button>
            </div>

        </div>
    ))

    if (deck.id) {

        return (
            <React.Fragment>
                <h1>{deck.name}</h1>
                <h4>({deck.cards.length} cards)</h4>
                <p>{deck.description}</p>
                <div className="my-4">
                    <Link to={`${url}/edit`} className="btn btn-dark mx-2">
                        <span className="oi oi-pencil"></span> Edit
                    </Link>
                    <Link to={`${url}/study`} className="btn btn-info mx-2">
                        <span className="oi oi-book"></span> Study
                    </Link>
                    <Link to={`${url}/cards/new`} className="btn btn-primary mx-2">
                        <span className="oi oi-plus"></span> Add Cards
                    </Link>
                    <button className="btn btn-danger mx-2 float-right" onClick={() => handleDeleteDeck(deck.id)}>
                        <span className="oi oi-trash"></span>
                    </button>
                </div>
                <h2>Cards</h2>
                {content}
            </React.Fragment>
        )
    }

    return "Loading..."

}