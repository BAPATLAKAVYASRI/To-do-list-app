// Define the task list array
let tasks = [];

// Get DOM elements
const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('tasks');

// Add task to the list
function addTask() {
  const taskText = taskInput.value.trim();
  const taskTime = taskDate.value.trim();

  if (taskText && taskTime) {
    const task = {
      text: taskText,
      date: taskTime,
      completed: false,
    };

    tasks.push(task);
    renderTasks();
    clearInputs();
  } else {
    alert('Please enter a task and a date/time');
  }
}

// Mark task as completed
function toggleCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Edit task
function editTask(index) {
  const newTaskText = prompt('Edit your task:', tasks[index].text);
  const newTaskTime = prompt('Edit the task date/time:', tasks[index].date);

  if (newTaskText && newTaskTime) {
    tasks[index].text = newTaskText;
    tasks[index].date = newTaskTime;
    renderTasks();
  }
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Render tasks to the UI
function renderTasks() {
  taskList.innerHTML = ''; // Clear the list before re-rendering

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.toggle('completed', task.completed);

    li.innerHTML = `
      <span>${task.text} - <strong>${task.date}</strong></span>
      <div>
        <button class="edit" onclick="editTask(${index})">Edit</button>
        <button class="delete" onclick="deleteTask(${index})">Delete</button>
        <button onclick="toggleCompletion(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
      </div>
    `;
    
    taskList.appendChild(li);
  });
}

// Clear input fields
function clearInputs() {
  taskInput.value = '';
  taskDate.value = '';
}

// Set up event listener for the "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// Render tasks when the page is loaded
renderTasks();
