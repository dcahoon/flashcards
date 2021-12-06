import React, { useEffect, useState } from "react"
import { useParams, useRouteMatch, useHistory } from "react-router-dom"
import { readDeck } from "../utils/api"

/* 
*   Parents: index > Decks > Deck
*   Children: none
*   
*   Description: Handles displaying a deck of cards for studying.
*   Displays front of one card. Clicking flip displays the back of
*   the card. On displaying the last card in the deck, a modal window
*   Prompt the user to restart. If user clicks cancel the app returns
*   the user.
*/

export default function Study() {

    const { url } = useRouteMatch() //
    const { deckId } = useParams()
    const history = useHistory()

    // The deck of cards that will be displayed one at a time.
    const [deck, setDeck] = useState({})
    // Boolean value for if the front is displayed (false displays back)
    const [front, setFront] = useState(true)
    // Index that progresses the cards through the deck.
    const [index, setIndex] = useState(0)

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

    const handleClick = (event) => {
        setFront(!front)
        if (front && index === deck.cards.length - 1) {
            if (window.confirm("Would you like to restart this deck?")) {
                setIndex(0)
                setFront(!front)
            } else {
                history.push("./")
            }
        }
    }

    const incrementIndex = () => {
        if (index < deck.cards.length - 1) {
            setIndex((previous) => previous + 1)
            setFront(!front)
            return
        }

        return
    }

    if (deck.id && deck.cards.length > 2) {
        
        const deckPath = `/decks/${deckId}`
        return(
            <React.Fragment>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Study</li>
                    </ol>
                </nav>
                <h1>Study: {deck.name}</h1>
                <div className="row justify-content-center my-5">
                    <div className="card p-4 col-8">
                        <p className="p-0 m-0">Card {index + 1} of {deck.cards.length}</p>
                        {
                            front && deck.cards[index] && deck.cards.length > 2
                                ? <h3 className="px-4 py-5">{deck.cards[index].front}</h3>
                                : <h3 className="px-4 py-5">{deck.cards[index].back}</h3>
                        }
                        <div className="row">
                            <button className="btn btn-dark" onClick={() => handleClick()}>
                                Flip
                            </button>
                            {
                                !front && index < deck.cards.length
                                    ?   <button 
                                            className="btn btn-primary ml-3" 
                                            onClick={() => incrementIndex()}
                                            disabled={index === deck.cards.length - 1}
                                        >
                                            Next Card
                                        </button>
                                    :   <></>
                            }
                        </div>
                    </div>
                </div>          
            </React.Fragment>
        )
    }


    return "Loading..."

}