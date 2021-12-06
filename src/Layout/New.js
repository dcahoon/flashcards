import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { createDeck } from "../utils/api"

/* 
*   Parents: index > Decks
*   Children: none
*   
*   Description: Presents a form for creating a new deck and handles submission.
*/

export default function New() {
    
    const history = useHistory()

    const initialFormData = {
        name: "New Deck",
        description: "Enter a description here...",
    }

    const [formData, setFormData] = useState({...initialFormData})

    const handleChange = ({ target }) => {
        const value = target.value
        setFormData({
            ...formData,
            [target.name]: value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        createDeck(formData)
        history.push("/decks")
    }

    return (
        <React.Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">New Deck</li>
                </ol>
            </nav>
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="py-1">
                    <label htmlFor="name">
                        Deck Name:
                    </label>
                    <div>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleChange}
                            value={formData.name}
                            className="w-100"
                        >
                        </input>
                    </div>
                </div>
                <div className="py-1">
                    <label htmlFor="description">
                        Description:
                    </label>
                    <div>
                        <textarea
                            type="text"
                            name="description"
                            id="description"
                            onChange={handleChange}
                            value={formData.description}
                            className="w-100"
                            rows="3"
                        >
                        </textarea>
                    </div>
                </div>
                <div className="pt-4">
                    <button type="cancel" className="btn btn-dark">Cancel</button>
                    <button type="submit" className="btn btn-primary mx-2">Create</button>
                </div>
            </form>
        </React.Fragment>
    )
}