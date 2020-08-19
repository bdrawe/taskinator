let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector('#tasks-to-do');
let taskIdCounter = 0;


let taskFormHandler = function(event) {
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if values are empty stings
    if (!taskNameInput || !taskTypeInput) {
        alert("Please fill out the input field");
        return false;
    }
    formEl.reset();
    let taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    //send it as an argument to the createTaskEl function
    createTaskEl(taskDataObj);
    
};

let createTaskEl = function(taskDataObj) {
    //create a list item
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //add task id as a custom attribute
    listItemEl.setAttribute('data-task-id', taskIdCounter);

    //create a div to hold class info and add to list item
    let taskInfoEl =  document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task.info";
    //add html to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "<h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    //add entire list items to the list
    tasksToDoEl.appendChild(listItemEl);
    
    taskIdCounter++;
}



formEl.addEventListener("submit", taskFormHandler);
