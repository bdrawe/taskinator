let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector('#tasks-to-do');
let taskIdCounter = 0;
let pageContentEl = document.querySelector('#page-content');


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

    let taskActionsEl = createTaskActions(taskIdCounter);
    console.log(taskActionsEl);
    listItemEl.appendChild(taskActionsEl);
    
    tasksToDoEl.appendChild(listItemEl);
    
    taskIdCounter++;
};
let createTaskActions = function(taskId){
    let actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    
  //create edit button
    let editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

   //create Delete Button
    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

 
    
    let statusSelectEl = document.createElement("select");
    console.log(statusSelectEl);
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    let statusChoices = ["To-Do", "In Progress", "Completed"];
    console.log(statusChoices);
    for (let i = 0; i < statusChoices.length; i++) {
         //create option element
    let statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

         //append to select
     statusSelectEl.appendChild(statusOptionEl);
    };
    return actionContainerEl;
}
let deleteTask = function(taskId){
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
    console.log(taskId);
}

let editTask = function(taskId)
 {
    console.log("editing task #" + taskId);

     let taskSelected =  document.querySelector(".task-item[data-task-id='" + taskId + "']");

     let taskName =  taskSelected.querySelector("h3.task-name").textContent;
     let taskType = taskSelected.querySelector("span.task-type").textContent;
     document.querySelector("input[name='task-name']").value = taskName;
     document.querySelector("select[name='task-type']").value = taskType;
     document.querySelector("#save-task").textContent = "Save Task";
     formEl.setAttribute("data-task-id", taskId);
 }
let taskButtonHandler = function(event) {
    var targetEl = event.target;

    //edit button was clicked
    if(targetEl.matches(".edit-btn")){
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    //if the delete button was clicked
     else if(targetEl.matches(".delete-btn"))  {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
}





pageContentEl.addEventListener("click", taskButtonHandler);
formEl.addEventListener("submit", taskFormHandler);
