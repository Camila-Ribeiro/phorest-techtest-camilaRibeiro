let searchBtn = document.getElementById("search_btn");
let searchInputError = document.getElementById("search_input_error");
let url = `https://api-gateway-dev.phorest.com/third-party-api-server/api/business/eTC3QY5W3p_HmGHezKfxJw/client?`;
let username = "global/cloud@apiexamples.com";
let password = "VMlRo/eh+Xd8M~l";

searchBtn.addEventListener ('click', () => {
    searchInputError.classList.add("d-none")
    let searchInput = document.getElementById("search_input").value;

    //check if input is empty
    checkIfEmpty(searchInput);

    if (validateEmail(searchInput)) {
        getAllData(url + 'email=' + searchInput)
    }
    else if(validatePhone(searchInput)) { 
        getAllData(url + 'phone=' + searchInput)
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
    if (field.match(/^\d/)) {
        return true;
    }else{
        return false;
    } 
}

//CHECK IF INPUT IS BLANK
let checkIfEmpty = (text) => {
    if(text == "" || text == null ){
        searchInputError.classList.remove("d-none");
    } 
}
    
// SEND REQUEST
function getAllData(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    // xhr.withCredentials = true;
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const getAllClients = this.response;
            populateClients(getAllClients);
        } 
    };
    xhr.onerror = function() {
        alert("Woops, there was an error making the request."); 
    };
    xhr.send();
}
