var params = new URLSearchParams(window.location.search);
var indexUser = params.get("index");
var usersFromStorage = JSON.parse(localStorage.getItem("users"));
console.log(usersFromStorage[indexUser]);
//===================================================================================
//                            The Header Links
//===================================================================================
var Profile = document.getElementById("ProLink");
var Courses = document.getElementById("Courses");
var DashboardLink = document.getElementById("DashboardLink");
var Tasks = document.getElementById("Tasks");
Profile.addEventListener("click",()=>{
    Profile.href = `/pages/profile.html?index=${indexUser}`;
});
Courses.addEventListener("click",()=>{
    Courses.href = `/pages/Courses.html?index=${indexUser}`;
});
DashboardLink.addEventListener("click",()=>{
    DashboardLink.href = `/pages/Dashboard.html?index=${indexUser}`;
});
Tasks.addEventListener("click",()=>{
    Tasks.href = `/pages/Tasks.html?index=${indexUser}`;
});
//===================================================================================
//                            Load Personal Data
//===================================================================================
var UsrName = document.getElementById("UsrName");
var ImgUsr = document.getElementById("ImgUsr");
UsrName.textContent = usersFromStorage[indexUser].name;
ImgUsr.src =  usersFromStorage[indexUser].ImgSrc;
//===================================================================================
//                            Add New Task
//===================================================================================
var TasksBox = document.getElementById("TasksBox");
var AddTaskBtn = document.getElementById("AddTaskBtn");
var TaskName = document.getElementById("TaskName"); // task
var TaskDue = document.getElementById("TaskDue");   // data input
var TaskPerority = document.getElementById("TaskPerority"); // select option 
var TaskStatus = document.getElementById("TaskStatus");


AddTaskBtn.addEventListener("click", () => {
    if (TaskName.value === "" || TaskDue.value === "" || TaskPerority.value === "") return;
    usersFromStorage[indexUser].TasksAll.push({
        TaskName: TaskName.value,
        TaskDue: TaskDue.value,
        TaskPerority: TaskPerority.value,
        TaskStatus: "Pending"
    });
    localStorage.setItem("users", JSON.stringify(usersFromStorage));
    LoadTasks();
    TaskName.value = "";
    TaskDue.value = "";
    TaskPerority.value = "";
});

function AddNewTaskUI(taskName, dueDate, priority, status, taskIndex) {

    var taskCard = document.createElement("div");
    taskCard.className = "task-card";

    /* ===== INFO ===== */
    var taskInfo = document.createElement("div");
    taskInfo.className = "task-info";

    var h3 = document.createElement("h3");
    h3.textContent = taskName;

    var p = document.createElement("p");
    p.textContent = "Due: " + dueDate;

    taskInfo.appendChild(h3);
    taskInfo.appendChild(p);

    /* ===== ACTIONS ===== */
    var taskActions = document.createElement("div");
    taskActions.className = "task-actions";

    // STATUS
    var statusSpan = document.createElement("span");
    statusSpan.className = `status ${status.toLowerCase()}`;
    statusSpan.innerHTML =
        status === "Completed"
            ? `<i class="fa-solid fa-check"></i> Completed`
            : `<i class="fa-solid fa-clock"></i> Pending`;

    // PRIORITY
    var prioritySpan = document.createElement("span");
    prioritySpan.className = `priority ${priority.toLowerCase()}`;
    prioritySpan.innerHTML =
        priority === "High"
            ? `<i class="fa-solid fa-arrow-up"></i> High`
            : `<i class="fa-solid fa-arrow-down"></i> Low`;

    // BUTTONS
    var completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;

    var pendingBtn = document.createElement("button");
    pendingBtn.className = "pending-btn";
    pendingBtn.innerHTML = `<i class="fa-solid fa-clock"></i>`;

    var deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    /* ===== EVENTS ===== */

    // COMPLETE
    completeBtn.addEventListener("click", () => {
        statusSpan.className = "status completed";
        statusSpan.innerHTML = `<i class="fa-solid fa-check"></i> Completed`;

        usersFromStorage[indexUser].TasksAll[taskIndex].TaskStatus = "Completed";
        localStorage.setItem("users", JSON.stringify(usersFromStorage));
    });

    // PENDING
    pendingBtn.addEventListener("click", () => {
        statusSpan.className = "status pending";
        statusSpan.innerHTML = `<i class="fa-solid fa-clock"></i> Pending`;

        usersFromStorage[indexUser].TasksAll[taskIndex].TaskStatus = "Pending";
        localStorage.setItem("users", JSON.stringify(usersFromStorage));
    });

    // DELETE
    deleteBtn.addEventListener("click", () => {
        usersFromStorage[indexUser].TasksAll.splice(taskIndex, 1);
        localStorage.setItem("users", JSON.stringify(usersFromStorage));
        LoadTasks();
    });

    taskActions.appendChild(statusSpan);
    taskActions.appendChild(prioritySpan);
    taskActions.appendChild(completeBtn);
    taskActions.appendChild(pendingBtn);
    taskActions.appendChild(deleteBtn);

    taskCard.appendChild(taskInfo);
    taskCard.appendChild(taskActions);
    TasksBox.appendChild(taskCard);
}

//===================================================================================
//                            Load Tasks
//===================================================================================
function LoadTasks() {
    TasksBox.innerHTML = "";

    var tasks = usersFromStorage[indexUser].TasksAll;

    for (let i = 0; i < tasks.length; i++) {
        AddNewTaskUI(
            tasks[i].TaskName,
            tasks[i].TaskDue,
            tasks[i].TaskPerority,
            tasks[i].TaskStatus,
            i // index
        );
    }
}
LoadTasks();

var TaskNameSreach = document.getElementById("TaskNameSreach");
function searchByTaskName() {
    var searchValue = TaskNameSreach.value.trim().toLowerCase();
    TasksBox.innerHTML = "";

    var Tasks = usersFromStorage[indexUser].TasksAll;

    var filteredTasks = Tasks.filter(task =>
        task.TaskName.toLowerCase().includes(searchValue)
    );

    if (filteredTasks.length === 0) {
        TasksBox.innerHTML = `<p style="color:white;">No courses found</p>`;
        return;
    }

    filteredTasks.forEach((task, index) => {
        AddNewTaskUI(
            task.TaskName,
            task.TaskDue,
            task.TaskPerority,
            task.TaskStatus,
            index
        );
    });
}
TaskNameSreach.addEventListener("input", searchByTaskName);


//===================================================================================
//                            Sorted By Pirority
//===================================================================================
function SortByPriority(priority) {

    var sortedTasks = [...usersFromStorage[indexUser].TasksAll];

    sortedTasks.sort((a, b) => {
        if (priority === "High") {
            return a.TaskPerority === "High" ? -1 : 1;
        } else {
            return a.TaskPerority === "Low" ? -1 : 1;
        }
    });

    TasksBox.innerHTML = "";

    sortedTasks.forEach(task => {
        const realIndex =usersFromStorage[indexUser].TasksAll.indexOf(task);
        AddNewTaskUI(
            task.TaskName,
            task.TaskDue,
            task.TaskPerority,
            task.TaskStatus,
            realIndex
        );
    });
}

var SortSelect = document.getElementById("SortBy");
SortSelect.addEventListener("change", () => {
    var sortValue = SortSelect.value;
    if (sortValue !== "") {
        SortByPriority(sortValue);
    }
});

