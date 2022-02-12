console.log("Popup running.")

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("quiz").addEventListener("click", async function() {
    
        let response = await fetch('http://localhost:5000/quiz');
        let data = await response.json();

        if(data.length === 0){
            alert("Kviz trenutno nije pokrenut!");
        }else{
            chrome.tabs.create({ url: chrome.runtime.getURL(".//html/index.html") });
        }
    });
});