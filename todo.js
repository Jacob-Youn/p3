const task = document.querySelector(".js-taskForm"),
    taskInput = task.querySelector("input"),
    pending = document.querySelector(".js-pending"),
    finished = document.querySelector(".js-finished");

const PENDING_LS = "pending",
    FINISHED_LS = "finished";

let pendingTasks = [];
let finishedTasks = [];

function deletePending(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pending.removeChild(li);
    const cleanPending = pendingTasks.filter(function(pending){
        return pending.id !== parseInt(li.id);        
    });
    pendingTasks = cleanPending;
    savePendingTasks();
}

function deleteFinished(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finished.removeChild(li);
    const cleanFinished = finishedTasks.filter(function(finished){
        return finished.id !== parseInt(li.id);        
    });
    finishedTasks = cleanFinished;
    saveFinishedTasks();
}

function switchTasks(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const idNumber = parseInt(li.id);
    const loadedPending = localStorage.getItem(PENDING_LS);
    const parsedPending = JSON.parse(loadedPending);
    const loadedFinished = localStorage.getItem(FINISHED_LS);
    const parsedFinished = JSON.parse(loadedFinished);
    let parentClass = li.parentNode.className; 
    if(parentClass === "dropdown-item js-pending"){
        const finishedObj = parsedPending.filter(selected => selected.id === idNumber);
        inputFinished(finishedObj[0].text);
        deletePending(event);
    } else {
        const pendingObj = parsedFinished.filter(selected => selected.id === idNumber);
        inputPending(pendingObj[0].text);
        deleteFinished(event);
    }
}

function savePendingTasks() {
    localStorage.setItem(PENDING_LS, JSON.stringify(pendingTasks));
}

function saveFinishedTasks() {
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishedTasks));
}

function inputPending(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deletePending);
    const verifyBtn = document.createElement("button");
    verifyBtn.innerText = "✅";
    verifyBtn.addEventListener("click",switchTasks);
    const span = document.createElement("span");
    const newId = pendingTasks.length + 1;
    span.innerText = text;
    li.id = newId;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(verifyBtn);
    pending.appendChild(li);
    const pendingObj = {
        text: text,
        id: newId
    };
    pendingTasks.push(pendingObj);
    savePendingTasks();
}

function inputFinished(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteFinished);
    const verifyBtn = document.createElement("button");
    verifyBtn.innerText = "✅";
    verifyBtn.addEventListener("click",switchTasks);
    const span = document.createElement("span");
    const newId = finishedTasks.length + 1;
    span.innerText = text;
    li.id = newId;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(verifyBtn);
    finished.appendChild(li);
    const finishedObj = {
        text: text,
        id: newId
    };
    finishedTasks.push(finishedObj);
    saveFinishedTasks();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = taskInput.value;
    inputPending(currentValue);
    taskInput.value = "";
}

function loadLS(){
    const loadedPending = localStorage.getItem(PENDING_LS);
    const loadedFinished = localStorage.getItem(FINISHED_LS);
    if(loadedPending !== null) {
        const parsedPending = JSON.parse(loadedPending);
        parsedPending.forEach(function(pending){
            inputPending(pending.text);          
        });
    };
    if(loadedFinished !== null) {
        const parsedFinished = JSON.parse(loadedFinished);
        parsedFinished.forEach(function(finished){
            inputFinished(finished.text); 
        });

    };
}
    
function init(){
    task.addEventListener("submit",handleSubmit);
    loadLS();
}

init();