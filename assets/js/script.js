let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector('#tasks-to-do');
let taskIdCounter = 0;
let pageContentEl = document.querySelector('#page-content');
let tasksInProgressEl = document.querySelector("#tasks-in-progress");
let tasksCompletedEl = document.querySelector("#tasks-completed");
let tasks = [];

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
    let isEdit = formEl.hasAttribute("data-task-id");

    if(isEdit) {
        let taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    else {
        let taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to-do"
        };

     createTaskEl(taskDataObj);
    }    
};

let completeEditTask = function(taskName, taskType, taskId) {
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //loop through the tasks array and task object with new content
    for(var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };
    saveTasks()

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent ="Add Task" ;
};


let createTaskEl = function(taskDataObj) {
    //create a list item
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //add task id as a custom attribute
    listItemEl.setAttribute('data-task-id', taskIdCounter);

    listItemEl.setAttribute("draggable", "true");

    //create a div to hold class info and add to list item
    let taskInfoEl =  document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task.info";
    //add html to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "<h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    let taskActionsEl = createTaskActions(taskIdCounter);
    // console.log(taskActionsEl);
    listItemEl.appendChild(taskActionsEl);
    
    tasksToDoEl.appendChild(listItemEl);

    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    saveTasks()

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
    // console.log(statusSelectEl);
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    let statusChoices = ["To-Do", "In Progress", "Completed"];
    // console.log(statusChoices);
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
    
    let updatedTaskArr = [];

    //lop through current tasks
    for (var i = 0;  i < tasks.length; i++) {
        //if tasks[i].id doesn't match the value of taskId, lets keep that task and push it into the new array
        if(tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    tasks = updatedTaskArr;
    saveTasks()
}

let editTask = function(taskId)
 {
    // console.log("editing task #" + taskId);

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


let taskStatusChangeHandler = function(event) {
        // get the task item's id
        let taskId = event.target.getAttribute("data-task-id");
      
        // get the currently selected option's value and convert to lowercase
        let statusValue = event.target.value.toLowerCase();
      
        // find the parent task item element based on the id
        let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
      } 
      else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
      } 
      else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
      }

    for (var i = 0; i <tasks.length; i++) {
        if(tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    saveTasks()
};

let dragTaskHandler = function(event) {
    let taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("text/plain", taskId);
    let getId = event.dataTransfer.getData("text/plain");
    saveTasks()
    
} 

let dropZoneDragHandler = function(event) {
    let taskListEl = event.target.closest(".task-list");
    if(taskListEl) {
        event.preventDefault();
        taskListEl.setAttribute("style", "background: rgba(68, 233, 225, 0.7); border-style: dashed;");
    };
}

let dropTaskHandler = function(event){
    let id = event.dataTransfer.getData("text/plain");
    let draggableElement =  document.querySelector("[data-task-id='" + id + "']");
    let dropZoneEl = event.target.closest(".task-list");
    let statusType = dropZoneEl.id;

    //set status of task based on dropZone id
    let statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    if (statusType === "tasks-to-do") {
        statusSelectEl.selectedIndex =0;
    } else if (statusType === "tasks-in-progress") {
        statusSelectEl.selectedIndex = 1;
    } else if (statusType === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
    }
    
    dropZoneEl.removeAttribute("style");
    dropZoneEl.appendChild(draggableElement);

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(id)) {
            tasks[i].status = statusSelectEl.value.toLowerCase();
        }
    }
    console.log(tasks);
    
};

let dragLeaveHandler = function(event) {
    let taskListEl = event.target.closest(".task-list");
    if (taskListEl){
        taskListEl.removeAttribute("style");
    }
}

let saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

let loadTasks =  function() {
    //gets tasks from localStorage
    tasks = localStorage.getItem('tasks');
    // console.log(tasks);
    //converts tasks from the stringified format back into an array of objects
    if (tasks === null){
        tasks = [];
        return false;
    }
    tasks = JSON.parse(tasks);
    // console.log("JSON" + tasks);
    //iterates through tasks array and creates task elements on the page from it.
    for (let i = 0; i < tasks.length; i++){
        //console.log(tasks[i]);
        tasks[i].id = taskIdCounter;
        // console.log( "this is the task counter Id" + taskIdCounter);
        //console.log(tasks[i]);
        listItemEl = document.createElement('li');
        listItemEl.className='task-item';
        listItemEl.setAttribute('data-task-id',tasks[i].id)
        listItemEl.setAttribute('draggable',true);
        console.log(listItemEl);
        let taskInfoEl = document.createElement('div');
        console.log(taskInfoEl);
        taskInfoEl.className = "task-info";
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "<h3><span class='task-type'>" + tasks[i].type + "</span>";
        taskInfoEl.appendChild(listItemEl);
        let taskActionsEl = createTaskActions(tasks[i].id);
        taskActionsEl.appendChild(listItemEl);
        console.log(listItemEl);
      
        if(tasks[i].status === "to-do"){
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
            listItemEl.appendChild(tasksToDoEl);

        } else if (tasks[i].status === "in progress"){
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
            listItemEl.appendChild(tasksInProgressEl);

        } else if (tasks[i].status === "complete") {
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 2
            listItemEl.appendChild(tasksCompletedEl);
        }
        taskIdCounter++
    }
    
}

pageContentEl.addEventListener("dragleave", dragLeaveHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
formEl.addEventListener("submit", taskFormHandler);
