// Function to load tasks from localStorage
function loadTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get tasks or an empty array

    tasks.forEach(task => {
        const li = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onclick = function () {
            
            task.completed = checkbox.checked;
            updateLocalStorage();
            if (checkbox.checked) {
                li.classList.add('completed');
            } else {
                li.classList.remove('completed');
            }
        };

        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';
        editButton.onclick = function () {
            const newText = prompt('Edit task:', taskSpan.textContent);
            if (newText && newText.trim() !== '') {
                task.text = newText.trim();
                taskSpan.textContent = task.text;
                updateLocalStorage();
            }
        };

        const removeButton = document.createElement('button');
        removeButton.className = 'remove';
        removeButton.textContent = 'Remove';
        removeButton.onclick = function () {
            li.remove();
            tasks.splice(tasks.indexOf(task), 1); 
            updateLocalStorage();
        };

        li.appendChild(taskSpan);
        li.appendChild(checkbox);
        li.appendChild(editButton);
        li.appendChild(removeButton);
        
        if (task.completed) {
            li.classList.add('completed');
        }

        taskList.appendChild(li);
    });
}

// Function to update tasks in localStorage
function updateLocalStorage() {
    const taskList = document.getElementById('taskList');
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        const task = {
            text: li.querySelector('span').textContent,
            completed: li.querySelector('input').checked
        };
        tasks.push(task);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to localStorage
}

// add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    // Create a new task object
    const task = {
        text: taskText,
        completed: false
    };

    const li = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onclick = function () {
        task.completed = checkbox.checked;
        updateLocalStorage();
        if (checkbox.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
    };

   
    const editButton = document.createElement('button');
    editButton.className = 'edit';
    editButton.textContent = 'Edit';
    editButton.onclick = function () {
        const newText = prompt('Edit task:', taskSpan.textContent);
        if (newText && newText.trim() !== '') {
            task.text = newText.trim();
            taskSpan.textContent = task.text;
            updateLocalStorage();
        }
    };

 
    const removeButton = document.createElement('button');
    removeButton.className = 'remove';
    removeButton.textContent = 'Remove';
    removeButton.onclick = function () {
        li.remove();
        tasks.splice(tasks.indexOf(task), 1); 
        updateLocalStorage();
    };

    li.appendChild(taskSpan);
    li.appendChild(checkbox);
    li.appendChild(editButton);
    li.appendChild(removeButton);

    const taskList = document.getElementById('taskList');
    taskList.appendChild(li);

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
}
window.onload = loadTasks;
