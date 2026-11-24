let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

// Store tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add Task
addBtn.addEventListener("click", function() {

    let taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    let task = {
        id: Date.now(),
        name: taskName,
        completed: false,
        createdAt: new Date().toLocaleDateString()
    };

    tasks.push(task);

    taskInput.value = "";

    saveTasks();
    displayTasks();
});

// Display Tasks
function displayTasks(filter = "all") {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (filter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach(function(task) {

        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = task.name;

        let date = document.createElement("small");
        date.textContent = "Created: " + (task.createdAt || "Date not available");

        if (task.completed) {
            span.classList.add("completed");
        }

        // Complete Button
        let completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";

        completeBtn.onclick = function() {
            task.completed = !task.completed;
            saveTasks();
            displayTasks(filter);
        };

        // Edit Button
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.onclick = function() {
            let newName = prompt("Edit your task:", task.name);

            if (newName !== null && newName.trim() !== "") {
                task.name = newName.trim();
                saveTasks();
                displayTasks(filter);
            }
        };

        // Delete Button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.onclick = function() {

            let confirmDelete = confirm(
                "Are you sure you want to delete this task?"
            );
            if(confirmDelete){
                tasks = tasks.filter(t => t.id !== task.id);
                saveTasks();
                displayTasks(filter);
            }
        };

        li.appendChild(span);
        li.appendChild(date);
        li.appendChild(completeBtn);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

    updateCounter();
}

// Filter Tasks
function filterTasks(filter) {
    displayTasks(filter);
}

// Update Counter
function updateCounter() {

    document.getElementById("total").textContent = tasks.length;

    let completedCount = tasks.filter(task => task.completed).length;

    document.getElementById("completed").textContent = completedCount;

    document.getElementById("remaining").textContent =
        tasks.length - completedCount;
}

// Save Tasks in Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display saved tasks when page loads
displayTasks();
