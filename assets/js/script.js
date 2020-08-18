var formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector('#tasks-to-do');


let createTaskHandler = function(event) {
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;
    //create a list item
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    //create a div to hold class info and add to list item
    let taskInfoEl =  document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task.info";
    //add html to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "<h3><span class='task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);

    //add entire list items to the list
    tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);
