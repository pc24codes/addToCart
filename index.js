import { add } from "../functions.js"

console.log(add(15,25))
const appSettings = {
    databaseURL : "https://add2cart-f129a-default-rtdb.firebaseio.com/"
}


const addBtn = document.getElementById("add-btn")
const inputField = document.getElementById("input-field")

addBtn.addEventListener("click",function(){
    let inputValue = inputField.value // this will fetch the data from the input field
    
    console.log(inputValue)
})