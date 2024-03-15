let taskList = document.querySelector(".task-list");
let addTaskBtn = document.querySelector(".add-task-btn");
let clearAllBtn = document.querySelector(".clear-all-btn");

let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

storedTasks.forEach(task => {
    appendTask(task.text, task.completed);
});

function appendTask(taskText, isCompleted) {
    let taskItem = document.createElement("li");
    taskItem.classList.add("task");
    taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${isCompleted ? 'checked' : ''}>
            <span class="task-text ${isCompleted ? 'task-completed' : ''}">${taskText}</span>
            <span class="delete-btn"><i class="fas fa-trash-alt"></i></span> <!-- Use Font Awesome trash icon -->
        `;

    let taskCheckbox = taskItem.querySelector(".task-checkbox");
    let taskTextSpan = taskItem.querySelector(".task-text");

    taskCheckbox.addEventListener("change", function () {
        if (taskCheckbox.checked) {
            taskTextSpan.classList.add("task-completed");
        } else {
            taskTextSpan.classList.remove("task-completed");
        }
        updateStoredTasks();
    });

    let deleteBtn = taskItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
        taskList.removeChild(taskItem);
        storedTasks = storedTasks.filter(task => task.text !== taskText);
        updateStoredTasks();
    });

    taskList.appendChild(taskItem);
}

function updateStoredTasks() {
    storedTasks = [];
    taskList.querySelectorAll(".task").forEach(taskItem => {
        storedTasks.push({
            text: taskItem.querySelector(".task-text").textContent,
            completed: taskItem.querySelector(".task-checkbox").checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
}

addTaskBtn.addEventListener("click", function () {
    let taskInput = document.querySelector(".task-input");
    let taskText = taskInput.value.trim();
    if (taskText) {
        appendTask(taskText, false);
        updateStoredTasks();
        taskInput.value = "";
    } else {
        alert("Please enter a task!");
    }
});

clearAllBtn.addEventListener("click", function () {
    taskList.innerHTML = "";
    storedTasks = [];
    localStorage.removeItem("tasks");
});
