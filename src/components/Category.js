import React, { useState } from 'react'
import { db } from "../firebase";

const Category = () => {
    const [categoryName, setCategoryName] = useState("");

    const [loader, setLoader] = useState(false);

    const handleSubmitCategoryForm = (e) => {
        e.preventDefault();
        setLoader(true);
        // TODO: validation on the input data? when data is empty? when data already exists?

        db.collection('categories').add({
            name:categoryName
        })
        .then(() => {
            alert('Category entry successful');
            setLoader(false);
        })
        .catch((error) => {
            alert(error.message);
            setLoader(false);
        });

        setCategoryName("");
    };

    return (
        <form className="form" onSubmit={handleSubmitCategoryForm}>
            <h1>Create A Category</h1>

            <label>Category Name </label>
            <input placeholder="category name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />

            <button type="submit" style={{background : loader ? "#ccc": "rgb(239, 239, 239)"}}>Submit</button>
        </form>
    )
}

export default Category
