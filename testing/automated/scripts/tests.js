var btnSearch = document.createElement('button');
btnSearch.setAttribute("id", "button_search");

var inputLoc = document.createElement('input');
inputLoc.setAttribute("id", "places_loc");

var inputMessage = document.createElement('div');
inputMessage.setAttribute("id", "places_loc_error");

btnSearch.onclick = function(){
    sessionStorage.clear();
    var radioPlaces = document.querySelector('input[name="places"]:checked').value;
    
    if (inputLoc.value == "" ||  inputLoc.value == null) {
         inputLoc.classList.add("border-danger");
         inputMessage.style.display = "block";
     }else{
        sessionStorage.setItem("place",radioPlaces);
        sessionStorage.setItem("location",inputLoc.value);
        window.location.href='search-results.html';
     }
};

inputLoc.oninput = function(){
    if (inputLoc.value == "" ||  inputLoc.value == null) {
        inputLoc.classList.add("border-danger");
        inputMessage.style.display = "block"; 
     }else{
        inputLoc.classList.remove("border-danger");
        inputMessage.style.display = "none"; 
    }
};



