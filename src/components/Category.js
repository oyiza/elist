import React, { useState, useEffect } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { db } from "../firebase";

const Category = () => {
    // data from form
    const [categoryName, setCategoryName] = useState("");
    const [entryName, setEntryName] = useState("");
    const [dropdownCategoryName, setdropdownCategoryName] = useState("");

    // data from firebase
    const [categoryNameList, setcategoryNameList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [categoryExists, setCategoryExists] = useState(false);

    // https://www.pluralsight.com/guides/executing-promises-in-a-react-component
    useEffect(() => {
        const getCategories = async () => {
            updateCategoryLists();
        };
        getCategories();
    }, [])

    // TODO: prevent duplicate items being added to the db
    const handleSubmitCategoryForm = (e) => {
        e.preventDefault();

        if (categoryName.length <= 0) {
            alert("empty category, please enter something in category field");
            return;
        }

        updateCategoryLists();
        // const temp = categoryNameList.find(element => element["name"] === categoryName);
        const temp = categoryList.find(element => element["name"] === categoryName);
        setCategoryExists(temp !== undefined);

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

    const updateCategoryLists = (e) => {
        const categoryList = ["select a category..."];
        const categoryNameAndId = [];

        db.collection('categories')
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const name = doc.data();
                const id = doc.id;
                categoryList.push(name["name"]);
                const data = {"id": id, "name": name["name"]}
                categoryNameAndId.push(data);
            });
        })
        .catch (error => console.log(error));
        
        // DEBUG
        // console.log("categoryNameAndId below----");
        // console.log(categoryNameAndId);
        // console.log("categoryList below----");
        // console.log(categoryList);

        setcategoryNameList(categoryList)
        setCategoryList(categoryNameAndId);
    };

    const handleDeleteCategory = (e) => {
        e.preventDefault();

        updateCategoryLists();

        // TODO: change from alerts to displaying span message or something on successful add / delete category
        const temp = categoryList.find(element => element["name"] === dropdownCategoryName);
        if (temp !== undefined) {
            console.log("about to delete category: " + dropdownCategoryName + " with id: " + temp["id"]);
            const id = temp["id"];
            db.collection('categories').doc(id).delete()
            .then(() => {
                alert('successfully deleted ' + dropdownCategoryName);
            })
            .catch((error) => {
                alert(error.message);
            });
        } else {
            console.log("selected category is undefined...");
        }

        // https://ej2.syncfusion.com/react/documentation/drop-down-list/how-to/clear-item/
        setdropdownCategoryName(null);
    };

    const handleDeleteCategoryV2 = async () => {
        // alternate implementation of async delete that doesn't always work. it reloads the page though
        // which might be a good thing but there's something off with it
    }

    const captureValue = (e) => {
        // console.log(e.value);
        setdropdownCategoryName(e.value);
    };

    // DEBUG
    const printCategories = (e) => {
        e.preventDefault();

        updateCategoryLists();
        console.log("printing categoryList...")
        console.log(categoryList)
        // console.log(categoryNameList);
        // categoryNameList.forEach(category => {
        //     console.log(category["name"]);
        // });
    }

    const handleSubmitEntry = (e) => {
        e.preventDefault();
        console.log('HANDLESUBMITCATEGORY');
    }

    return (
        <>  
            <form className="categoryForm">
                <h1>Create A Category</h1>

                <label>Category Name </label>
                <input placeholder="category name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />

                <button onClick={handleSubmitCategoryForm}>Submit</button>
                <button onClick={printCategories}>print categories to console</button>

                <h1>Delete A Category</h1>
                <Dropdown options={categoryNameList} onChange={captureValue} value={dropdownCategoryName} placeholder="select a category..." />
                <button onClick={handleDeleteCategory}>Delete</button>
                {/* <button onClick={handleDeleteCategoryV2}>Delete (test)</button> */}
            </form>
            
            <form className="entryForm">
                <h1>Make a category entry</h1>

                <label>Select a category: </label>
                <Dropdown options={categoryNameList} onChange={captureValue} value={dropdownCategoryName} placeholder="select a category..." />

                <label>Make a new entry: </label>
                {/* TODO: make this work with the whole form shenanigans... similar to category name input */}
                <input placeholder="type something" value={entryName} onChange={(e) => setEntryName(e.target.value)} />

                <button onClick={handleSubmitEntry}>Submit</button>
            </form>
        </>
    )
}

export default Category
