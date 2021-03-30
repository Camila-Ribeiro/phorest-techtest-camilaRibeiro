let url = `https://api-gateway-dev.phorest.com/third-party-api-server/api/business/eTC3QY5W3p_HmGHezKfxJw/client?`;
let username = "global/cloud@apiexamples.com";
let password = "VMlRo/eh+Xd8M~l";

//BTNS
let searchBtn = document.getElementById("search_btn");
let btnAddVoucher = document.getElementById("add_voucher");
let btnCreateVoucher = document.getElementById("create_voucher");

//INPUTS
let searchInput = document.getElementById("search_input");
let searchInputError = document.getElementById("search_input_error");
let clientId = document.getElementById("client_id");
let branchId = document.getElementById("branch_id");

let displayClients = document.getElementById("display_clients");
let voucherForm = document.getElementById("voucher_form");

//ADD KeyboardEvent.code TO TRIGGER SEARCH BUTTON CLICK ON ENTER KEY
searchInput.addEventListener("keyup", (e) => {
    if (e.code === 'Enter') {
        document.getElementById("search_btn").click();
    }
});

//SEARCH BUTTON
searchBtn.addEventListener ('click', () => {
    searchInputError.classList.add("d-none");
    let searchInputVal = searchInput.value;

    //check if input is empty
    checkIfEmpty(searchInputVal, searchInputError);

    if (validateEmail(searchInputVal)) {
        getAllData(url + 'email=' + searchInputVal);
        displayClients.classList.add("d-none");
    }
    else if(validatePhone(searchInputVal)) { 
        getAllData(url + 'phone=' + searchInputVal);
        displayClients.classList.add("d-none");
    } else {
        searchInputError.classList.remove("d-none");
        setTimeout(() => searchInputError.classList.add("d-none"), 4000);
        displayClients.classList.add("d-none");
    }
});

//ADD VOUCHER BUTTON
btnAddVoucher.addEventListener('click', () => {
    let addVoucherError = document.getElementById("add_voucher_error");
    if (branchId.value == "undefined") {
        addVoucherError.classList.remove("d-none");
        setTimeout(() => addVoucherError.classList.add("d-none"), 5000);
    }else{
        voucherForm.classList.remove("d-none");
        scrollDown();
    }
});

//CREATE VOUCHER BUTTON
btnCreateVoucher.addEventListener('click', () => {
    let voucherInput = document.getElementById("voucher_input").value;
    let voucherInputError = document.getElementById("voucher_input_error");

    if(checkIfEmpty(voucherInput, voucherInputError)){
        setTimeout(() => voucherInputError.classList.add("d-none") , 5000);
    }else {
        let retrieveClientId = clientId.value;
        let retrieveBranchId = branchId.value;
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
    }
});

//CHECK IF INPUT IS BLANK
let checkIfEmpty = (text, el) => {
    if(text == "" || text == null ){
        el.classList.remove("d-none");
        return true;
    }else{
        return false;
    } 
};

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

//DISPLAY MESSAGE SUCCESS
function messageSuccess() {
    let messageSuccess = document.getElementById("message_success");
    let clientsContainer = document.getElementById("display_clients");
    let voucherContainer = document.getElementById("voucher_form");
    getEnterKey.disabled = true;
    searchBtn.disabled = true;
    messageSuccess.classList.remove("d-none");
    clientsContainer.remove();
    voucherContainer.remove();
    setTimeout(() => location.reload(), 6000);
}

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

            //DISPLAY THE DB IN THE HTML
            clientId.value = `${db.clientId}`;
            branchId.value = `${db.creatingBranchId}`;
            clientFirstName.innerHTML = `${db.firstName}`;
            clientLasttName.innerHTML = `${db.lastName}`;
            clientEmail.innerHTML = `${db.email}`;
        });
    }  
};

//SEND REQUEST //GET CLIENTS API
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

//POST REQUEST //GET VOUCHER API
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
