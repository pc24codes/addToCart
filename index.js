//Firebase methods to initialize the DB
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://add2cart-f129a-default-rtdb.firebaseio.com/"
}

// ref.orderByChild('pieceNum_').limitToLast(10);


//Variables
const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "items")

const addBtn = document.getElementById("add-btn")
const inputField = document.getElementById("input-field")
const shoppingList = document.getElementById("shopping-list")

//Event listeners for adding items

addBtn.addEventListener("click",function(){
    let inputValue = inputField.value // this will fetch the data from the input field
    
    push(itemsInDB, inputValue) //enables us to push the vlaues to the DB
   
    clearValue()
    printItems(inputValue)    
   
})

onValue(itemsInDB, function(snapshot) {
    console.log(snapshot.val())
})

//clears the input field
function clearValue(){
    inputField.value = ""
}

//prints the items in list
function printItems(itemValue) { //without parameter it will not work in printing items
    shoppingList.innerHTML += `<li>${itemValue}</li>`    
}









