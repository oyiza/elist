import React, { useState } from 'react'
import { db } from "../firebase";

const Category = () => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [categoryExists, setCategoryExists] = useState(false);

    const handleSubmitCategoryForm = (e) => {
        e.preventDefault();

        if (categoryName.length <= 0) {
            alert("empty category, please enter something in category field");
            return;
        }

        setCategoryList(fetchCategories());
        const temp = categoryList.find(element => element["name"] == categoryName);
        setCategoryExists(temp != undefined);
        
        if (!categoryExists) {
            db.collection('categories').add({
                name:categoryName
            })
            .then(() => {
                alert('Category entry successful');
            })
            .catch((error) => {
                alert(error.message);
            });

            setCategoryName("");
        } else {
            alert('Category exists in db already.!');
        }
    };

    const fetchCategories = (e) => {
        const checkCategoryName = [];
        db.collection('categories')
            .get()
            .then(snapshot => {
                // console.log(snapshot);
                snapshot.forEach(doc => {
                    const data = doc.data();
                    checkCategoryName.push(data);
                });
            })
            .catch (error => console.log(error));
        
        return checkCategoryName;
    }

    // debug purposes
    const printCategories = (e) => {
        e.preventDefault();
        setCategoryList(fetchCategories());
        categoryList.forEach(category => {
            console.log(category["name"]);
        });
    }

    return (
        <form className="form">
            <h1>Create A Category</h1>

            <label>Category Name </label>
            <input placeholder="category name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />

            <button onClick={handleSubmitCategoryForm}>Submit</button>
            <button onClick={printCategories}>print categories to console</button>
        </form>
    )
}

export default Category
