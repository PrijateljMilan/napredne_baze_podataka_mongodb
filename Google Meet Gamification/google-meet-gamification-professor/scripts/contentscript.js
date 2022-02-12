console.log("Contentscript running.")

var seen = 0;
var grid = 0;
var meetMessage = '';
var messagecalled = false;
let url = window.location.href;
let meetId = '';

/*
//proverava da li je klijent van sastanka
const checkMeetView = setInterval(()=>{
    if(!document.getElementsByClassName("OKJMXc")[0])
    {
        //sve sto treba da se resetuje kad korisnik izadje
        seen = 0;
        grid = 0;
        meetMessage = '';
        messagecalled = false;
    }
}, 1000)
*/

//profesor pritiska dugme za dodavanje poena
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.message === "meetingstart" ) { meetingStart();}
        if(request.message === "meetingend" ) { meetingEnd();}
        if(request.message === "quizcreate" ) { createQuiz();}
        if(request.message === "quizend" ) { quizEnd();}
    }
);
function meetingStart() {
    let code = document.getElementsByClassName("Jyj1Td CkXZgc")[0].textContent
    let name = 'Napredne base podataka';

    const data = { 
        meet_code: code,
        meet_name: name,
        active: true,
        students: [] 
        };
    fetch('http://localhost:5000/meeting', {
        method: 'POST', // or 'PUT'
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(data),
        })
    .then(response => response.json())
    .then(data => {console.log('Success:', data);})
    .then(()=>alert("Uspesno je pokrenuto ocenjivanje!"))
    .catch((error) => {console.error('Error:', error);});
}

function meetingEnd() {
    let code = document.getElementsByClassName("Jyj1Td CkXZgc")[0].textContent

    const data = { 
        active: false,
        };
    fetch('http://localhost:5000/meeting' + "/" + code ,{
        method: 'PUT', // or 'PUT'
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(data),
        })
    .then(response => response.json())
    .then(data => {console.log('Success:', data);})
    .then(() => alert("Uspesno je zavrseno ocenjivanje!"))
    .catch((error) => {console.error('Error:', error);});
}

function quizEnd() { 
    fetch('http://localhost:5000/quiz',{
        method: 'DELETE', // or 'PUT'
        headers: {'Content-Type': 'application/json',},
        })
    .then(response => response.json())
    .then(data => {console.log('Success:', data);})
    .then(() => alert("Uspesno je ugasen kviz!"))
    .catch((error) => {console.error('Error:', error);});
}



function createQuiz(){

    const modal2 = document.createElement("dialog");
    modal2.className= "modalPoints";
    modal2.innerHTML = "";
    document.body.appendChild(modal2);
    modal2.showModal();

    let mainPageDiv2 = document.createElement("div");
    mainPageDiv2.className="mainPageDiv";
    modal2.appendChild(mainPageDiv2);

    let exitButton2 = document.createElement("button");
    exitButton2.className = "exitButton";
    exitButton2.id = "exitbutton"
    mainPageDiv2.appendChild(exitButton2);

    let form = document.createElement("form");
    form.className = "form";
    mainPageDiv2.appendChild(form);

    let labela = document.createElement("label");
    labela.className = "labela";
    labela.innerHTML = "Unesite pitanje i odgovore:"
    form.appendChild(labela);

    
    let input1 = document.createElement("input");
    input1.id = "question";
    input1.className = "inputPolje";
    input1.type = "text";
    input1.placeholder = "Pitanje";
    form.appendChild(input1);

    let input2 = document.createElement("input");
    input2.id = "answer";
    input2.className = "inputPolje";
    input2.type = "text";
    input2.placeholder = "Tacan odgovor";
    form.appendChild(input2);

    let input3 = document.createElement("input");
    input3.id = "false_answer1";
    input3.className = "inputPolje";
    input3.type = "text";
    input3.placeholder = "Netacan orgovor";
    form.appendChild(input3);

    let input4 = document.createElement("input");
    input4.id = "false_answer2";
    input4.className = "inputPolje";
    input4.type = "text";
    input4.placeholder = "Netacan orgovor";
    form.appendChild(input4);

    let input5 = document.createElement("input");
    input5.id = "false_answer3";
    input5.className = "inputPolje";
    input5.type = "text";
    input5.placeholder = "Netacan orgovor";
    form.appendChild(input5);

    let submitButton = document.createElement("button");
    submitButton.id = "submitB";
    submitButton.type = "button";
    submitButton.className = "submitButton";
    submitButton.innerHTML = "Unesi pitanje";
    form.appendChild(submitButton);

    form.querySelector("#submitB").addEventListener("click", sendData);
    modal2.querySelector("#exitbutton").addEventListener("click", () => {modal2.close();});
}
function sendData(){

    quest = document.querySelector("#question").value;
    answ = document.querySelector("#answer").value;
    false_answer1 = document.querySelector("#false_answer1").value;
    false_answer2 = document.querySelector("#false_answer2").value;
    false_answer3 = document.querySelector("#false_answer3").value;
    const data = { 
        question: quest,
        answer: answ,
        options: [answ, false_answer1, false_answer2, false_answer3]
        };

    fetch('http://localhost:5000/quiz', {
        method: 'POST', // or 'PUT'
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(data),
        })
    .then(response => response.json())
    .then(() => {alert('Kviz je uspesno dodat')})
    .then(() => clearInput())
    .catch((error) => {
      console.error('Error:', error);
    });

    
}

function clearInput() {
    document.querySelector("#question").value = "";
    document.querySelector("#answer").value = "";
    document.querySelector("#false_answer1").value = "";
    document.querySelector("#false_answer2").value = "";
    document.querySelector("#false_answer3").value = "";
}