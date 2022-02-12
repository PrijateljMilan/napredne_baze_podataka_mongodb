console.log("Contentscript running.")

var counter = 0
var seen = 0;
var grid = 0;
var meetMessage = '';
var messagecalled = false;
let url = window.location.href;
let meetId = '';


const addButton = setInterval(() => {

    mainPannel = document.getElementsByClassName("vqs9je")[0];   

    if (mainPannel != undefined && counter == 0){
        
        counter +=1

        let newDiv = document.createElement("div");
        newDiv.className="vqs9je";
        newDiv.style.display = "inline-block"
        mainPannel.appendChild(newDiv);

        let newButton = document.createElement("button");
        newButton.className = "popupButton";
        newDiv.appendChild(newButton);

        //document.getElementById("id_popupButton").addEventListener("click", createModal);
    }

}, 1000)