document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            if (task.completed) {
                li.classList.add('completed');
            }
            li.innerHTML = `
                <span>${task.text}</span>
                <div class="task-actions">
                    <button class="edit" onclick="editTask(${index})">Edit</button>
                    <button class="delete" onclick="deleteTask(${index})">Delete</button>
                    <button class="toggle" onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    }

    window.editTask = function(index) {
        const newText = prompt('Edit task:', tasks[index].text);
        if (newText !== null && newText.trim() !== '') {
            tasks[index].text = newText.trim();
            saveTasks();
            renderTasks();
        }
    };

    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    window.toggleTask = function(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});