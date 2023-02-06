const form = document.querySelector("#form");
const taskInput = document.querySelector("#task");
const tasksList = document.querySelector("#tasks");

// Get tasks from local storage
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render the tasks
function renderTasks() {
  tasksList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = task.text;
    if (task.completed) {
      li.classList.add("ended");
    }
    const removebt = document.createElement("span");
    removebt.textContent = "Delete";
    removebt.classList.add("remove");

    li.appendChild(removebt);

    removebt.addEventListener("click", function() {
      tasks.splice(index, 1);
      li.remove();
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });

    li.addEventListener("click", function() {
      task.completed = !task.completed;
      li.classList.toggle("ended");
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    tasksList.appendChild(li);
  });
}
renderTasks();

// Add task to list and local storage
form.addEventListener("submit", function(event) {
  event.preventDefault();
  const task = taskInput.value;
  if (!task) return;
  tasks.push({ text: task, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  renderTasks();
});
