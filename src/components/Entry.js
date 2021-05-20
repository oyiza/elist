import React from 'react'

export const Entry = () => {
    return (
        <form className="form">
            <h1>Make a category entry</h1>

            <label>Select a category: </label>
            {/* should be a dropdown list with values from categories */}
            <input placeholder="category name" />

            <label>Make a new entry: </label>
            <input placeholder="type something" />

            <button type="submit">Submit</button>
        </form>
    )
}

export default Entry
