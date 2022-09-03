// On form submit add task
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    addTask();
});

function addTask() {
    const task = document.querySelector("form input");
    const list = document.querySelector("ul");
    // return if task is empty
    if (task.value === "") {
        alert("Add a task");
        return false; 
    }
} 

