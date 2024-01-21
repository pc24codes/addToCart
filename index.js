//Firebase methods to initialize the DB
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://add2cart-f129a-default-rtdb.firebaseio.com/"
}




//Variables
const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "items")

const addBtn = document.getElementById("add-btn")
const inputField = document.getElementById("input-field")
const shoppingList = document.getElementById("shopping-list") // UL of the html

//Event listeners for adding items

addBtn.addEventListener("click",function(){
    let inputValue = inputField.value // this will fetch the data from the input field
    
    push(itemsInDB, inputValue) //enables us to push the values to the DB
   
    clearValue()
})

//Enter button accepts value

inputField.addEventListener("keypress", function(event){
    if(event.key === "Enter" && inputField != ""){
        event.preventDefault();
        addBtn.click();
    }
})


/*
This is to render the items on the page
*/

onValue(itemsInDB, function(snapshot) {
   
    /*this is will make sure that if there is a snapshot, 
    only then it prints the values
    */

    if(snapshot.exists()){

        let itemsArray = Object.entries(snapshot.val()) //Changes the values into arrays
    
        clearShoppingList()
    
        for(let i = 0; i<itemsArray.length; i++)
        {   
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemVal = currentItem[1]
            printItems(currentItem)
    
        }
    }else{
        shoppingList.innerHTML = "No Items added!"
    }
   
   
})


function clearShoppingList(){
    shoppingList.innerHTML = ""
}

//clears the input field
function clearValue(){
    inputField.value = ""
}

//prints the items in list
function printItems(item) { //without parameter it will not work in printing items
   
    let itemID = item[0]
    let itemValue = item[1]


    let newEl  = document.createElement("li") //Variable is declared to store it in newElement
    
    newEl.textContent = itemValue // .text content to display items in HTML
    
    //Event listener to remove item when clicked
    newEl.addEventListener("click", function(){
      let exactLocationOfItem = ref(database, `items/${itemID}`) //checks for the exact item ID in DB
       
      remove(exactLocationOfItem) // removes the item which was clicked
    })

    shoppingList.append(newEl) // the new values are appended to parent element so it can render the items



}