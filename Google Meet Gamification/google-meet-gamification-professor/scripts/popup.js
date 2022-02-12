console.log("Popup running.");

//MEETING START
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("meetingstart").addEventListener("click", meetingStart);
    document.getElementById("meetingend").addEventListener("click", meetingEnd);
    document.getElementById("quizcreate").addEventListener("click", quizCreate);
    document.getElementById("quizend").addEventListener("click", quizEnd);
    // this.disabled = true;
  });

function meetingStart() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "meetingstart"});
    });  
}
//MEETING END


function meetingEnd() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "meetingend"});
    });  
}
//KVIZ CREATE


function quizCreate() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "quizcreate"});
    });  
}
//KVIZ END


function quizEnd() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "quizend"});
    });  
}

