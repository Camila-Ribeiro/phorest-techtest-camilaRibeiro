let searchBtn = document.getElementById("search_btn");
let searchInputError = document.getElementById("search_input_error");
let url = `https://api-gateway-dev.phorest.com/third-party-api-server/api/business/eTC3QY5W3p_HmGHezKfxJw/client?`;
let username = "global/cloud@apiexamples.com";
let password = "VMlRo/eh+Xd8M~l";
let clientId = document.getElementById("client_id");
let branchId = document.getElementById("branch_id");
let displayClients = document.getElementById("display_clients");


searchBtn.addEventListener ('click', () => {
    searchInputError.classList.add("d-none");
    let searchInput = document.getElementById("search_input").value;

    //check if input is empty
    checkIfEmpty(searchInput);

    if (validateEmail(searchInput)) {
        getAllData(url + 'email=' + searchInput);
        displayClients.classList.add("d-none");
    }
    else if(validatePhone(searchInput)) { 
        getAllData(url + 'phone=' + searchInput);
        displayClients.classList.add("d-none");
    } else {
        searchInputError.classList.remove("d-none");
        setTimeout(() => searchInputError.classList.add("d-none"), 4000);
        displayClients.classList.add("d-none");
    }
});

//ADD KeyboardEvent.code TO TRIGGER A BUTTON CLICK ON ENTER KEY
let getEnterKey = document.getElementById("search_input");
getEnterKey.addEventListener("keyup", (e) => {
    if (e.code === 'Enter') {
        document.getElementById("search_btn").click();
    }
});

//ADD VOUCHER
let addVoucher = document.getElementById("add_voucher");
let voucherForm = document.getElementById("voucher_form");

addVoucher.addEventListener('click', () => {
    let addVoucherError = document.getElementById("add_voucher_error");
    if (branchId.value == "undefined") {
        addVoucherError.classList.remove("d-none");
        setTimeout(() => addVoucherError.classList.add("d-none"), 5000);
    }
    scrollDown();
});

//CREATE VOUCHER
let btnCreateVoucher = document.getElementById("create_voucher");
btnCreateVoucher.addEventListener('click', () => {
    
    let retrieveClientId = clientId.value;
    let retrieveBranchId = branchId.value;
    let voucherInput = document.getElementById("voucher_input").value;
    let getDecimalValue = parseFloat(voucherInput).toFixed(2);
    let body = 
    JSON.stringify({
        clientId: retrieveClientId,
        creatingBranchId: retrieveBranchId,
        issueDate : moment(),
        expiryDate : moment().add(1, 'years'),
        originalBalance : getDecimalValue
    });
    createVoucher(body);
});

// DISPLAY MESSAGE SUCCESS
function messageSuccess() {
 
    let messageSuccess = document.getElementById("message_success");
    let clientsContainer = document.getElementById("display_clients");
    let voucherContainer = document.getElementById("voucher_form");
    messageSuccess.classList.remove("d-none");
    clientsContainer.remove();
    voucherContainer.remove();
    // setTimeout(() => location.reload(), 5000);
}

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
};

//GET LIST OF CLIENTS
const populateClients = (resp) => {
    let arr = JSON.parse(resp);

    if(arr._embedded === undefined){
        searchInputError.classList.remove("d-none");
        setTimeout(() => searchInputError.classList.add("d-none"), 4000);
    }else{
        displayClients.classList.remove("d-none");

        let clientsList = arr._embedded.clients;
        clientsList.forEach(db => {
            let clientFirstName = document.getElementById("first_name");
            let clientLasttName = document.getElementById("last_name");
            let clientPhoneNumber = document.getElementById("mobile");
            let clientEmail = document.getElementById("email");
            
            if(typeof db.mobile === "undefined"){
                document.getElementById("mobile").innerHTML = "N/A";
            }else{
                clientPhoneNumber.innerHTML = `${db.mobile}`; 
            }
    
            // DISPLAY THE DB IN THE HTML
            clientId.value = `${db.clientId}`;
            branchId.value = `${db.creatingBranchId}`;
            clientFirstName.innerHTML = `${db.firstName}`;
            clientLasttName.innerHTML = `${db.lastName}`;
            clientEmail.innerHTML = `${db.email}`;
        });
    }  
};

// SEND REQUEST //GET CLIENTS API
function getAllData(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
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

// POST REQUEST //GET VOUCHER API
function createVoucher(data){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api-gateway-dev.phorest.com/third-party-api-server/api/business/eTC3QY5W3p_HmGHezKfxJw/voucher', true);
    xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xhr.onload = function () {
            console.log(this.responseText);
            messageSuccess();
    };
    xhr.onerror = function() {
        alert("Woops, there was an error making the request."); 
    };
    xhr.send(data);
}

//SCROLL TO THE bottom OF THE PAGE
const scrollDown = (h) => {
    let i = h || 0;
    if (i < 250) {
        setTimeout(() => {
        window.scrollTo(0, i);
        scrollDown(i + 220);
        }, 1);
    }
};
