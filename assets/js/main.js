let url = env.url;
let username = env.username;
let password = env.password;

//BTNS
let btnSearch = document.getElementById("search_btn");
let btnCreateVoucher = document.getElementById("create_voucher");

//INPUTS
let searchInput = document.getElementById("search_input");
let searchInputError = document.getElementById("search_input_error");
let clientId = document.getElementById("client_id");
let branchId = document.getElementById("branch_id");

let displayClients = document.getElementById("display_clients");
let voucherForm = document.getElementById("voucher_form");
let nameOnVoucher = document.getElementById("who");


//ADD KeyboardEvent.code TO TRIGGER SEARCH BUTTON CLICK ON ENTER KEY
searchInput.addEventListener("keyup", (e) => {
    if (e.code === 'Enter') {
        document.getElementById("search_btn").click();
    }
});

//SEARCH BUTTON
btnSearch.addEventListener ('click', () => {
    let searchInputVal = searchInput.value;
    
    resetForm();

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

// ADD VOUCHER BUTTON
let displayFormVoucher = (name, branch, client) => {
    
    let addVoucherError = document.getElementById("add_voucher_error");
    clientId.value = client;
    branchId.value = branch;

    if (branch == "undefined" || branch.length === 0) {
        addVoucherError.classList.remove("d-none");
        setTimeout(() => addVoucherError.classList.add("d-none"), 5000);
    }else{
        nameOnVoucher.value = name;
        voucherForm.classList.remove("d-none");
        voucherForm.scrollIntoView();
    }
};

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

// RESET AND HIDE VOUCHE FORM ON SEACH
let resetForm = () => {
    if (!voucherForm.classList.contains("d-none")) {
        voucherForm.classList.add("d-none");
    }
    voucherForm.reset();
};

//CHECK IF INPUT IS BLANk
let checkIfEmpty = (text, el) => {
    if(text == "" || text == null ){
        el.classList.remove("d-none");
        return true;
    }else{
        return false;
    } 
};

//VALIDATE E-MAIL ON INPUT
let validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

//VALIDATE PHONE NUMBER ON INPUT
let validatePhone = (field) => (field.match(/^\d/)) ? true : false;

//DISPLAY MESSAGE SUCCESS
let messageSuccess = () => {
    let messageSuccess = document.getElementById("message_success");
    let clientsContainer = document.getElementById("display_clients");
    let voucherContainer = document.getElementById("voucher_form");
    searchInput.disabled = true;
    btnSearch.disabled = true;
    messageSuccess.classList.remove("d-none");
    clientsContainer.remove();
    voucherContainer.remove();
    setTimeout(() => location.reload(), 6000);
};

//GET LIST OF CLIENTS
const populateClients = (resp) => {
    
    let arr = JSON.parse(resp);
    let infoClients = [];
    if(arr._embedded === undefined){
        searchInputError.classList.remove("d-none");
        setTimeout(() => searchInputError.classList.add("d-none"), 4000);
    }else{
        displayClients.classList.remove("d-none");
        let clientsList = arr._embedded.clients;
        for (let i = 0; i < clientsList.length; i++) {
            const db = clientsList[i];   
            infoClients.push(`<tr><td>${db.firstName}</td><td>${db.lastName}</td><td>${(typeof db.mobile === "undefined") ? "N/A" : db.mobile}</td><td>${(db.email.length === 0|| !db.email.trim()) ? "N/A" : db.email}</td><td><button class="btn btn-custom text-uppercase" onclick="displayFormVoucher('${db.firstName}','${db.creatingBranchId}','${db.clientId}')">Add Voucher</button></td></tr>`);
            document.getElementById("info_clients").innerHTML = infoClients.join("");
        }
    }  
};


//SEND REQUEST //GET CLIENTS API
let getAllData = (url) => {
    let xhr = new XMLHttpRequest();
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
};

//POST REQUEST //GET VOUCHER API
let createVoucher = (data) => {
    let xhr = new XMLHttpRequest();
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
};
