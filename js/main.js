let searchBtn = document.getElementById("search_btn");
let searchInputError = document.getElementById("search_input_error");

searchBtn.addEventListener ('click', () => {
    searchInputError.classList.add("d-none")
    let searchInput = document.getElementById("search_input").value;

    //check if input is empty
    checkIfEmpty(searchInput);

    if (validateEmail(searchInput)) {
        console.log("IF")
    }
    else if(validatePhone(searchInput)) {
        console.log("ELSE IF")
    } else {
        searchInputError.classList.remove("d-none");
        setTimeout(() => searchInputError.classList.add("d-none"), 4000);
    }
    
})

//VALIDATE E-MAIL ON INPUT
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//VALIDATE PHONE NUMBER ON INPUT
function validatePhone(field) {
    if (field.match(/^\d{15}/)) {
        return true;
    } 
    return false;
}

//CHECK IF INPUT IS BLANK
let checkIfEmpty = (text) => {
    if(text == "" || text == null ){
        searchInputError.classList.remove("d-none");
    } 
}

