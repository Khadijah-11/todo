document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const input = document.querySelector('input[name="title"]');
    const taskList = document.querySelector('ul.list-group');  

    // Clear default tasks from HTML and load tasks from localStorage when the page loads
    taskList.innerHTML = '';
    loadTasks();

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const taskText = input.value; 
        if(taskText !== '') {
            addTaskToList(taskText);
            input.value = '';
            saveTasks(); // Save tasks after adding a new one
        }
    });

    // Handle checkbox click
    taskList.addEventListener('change', function(event) {
        if (event.target.type === 'checkbox') {
            const listItem = event.target.parentElement; 
            if (event.target.checked) {
                listItem.classList.add('checked');
            } else {
                listItem.classList.remove('checked');
            }
            saveTasks(); // Save tasks after checking/unchecking
        }
    });

    // Delete task
    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('bi-trash')) {
            const listItem = event.target.parentElement.parentElement;
            listItem.remove();
            saveTasks(); // Save tasks after deletion
        }
    });

    // Function to add a task to the list
    function addTaskToList(taskText, completed = false) {
        const newTask = document.createElement('li');
        newTask.className = 'todo list-group-item d-flex align-items-center';

        newTask.innerHTML = `
            <input class="form-check-input" type="checkbox" ${completed ? 'checked' : ''}>
            <label class="ms-2 form-check-label">${taskText}</label>
            <label class="ms-auto btn btn-danger btn-sm">
                <i class="bi-trash"></i>
            </label>
        `;

        taskList.appendChild(newTask);
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            const text = task.querySelector('label').textContent;
            const completed = task.querySelector('input').checked;
            tasks.push({ text, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToList(task.text, task.completed));
    }
});

