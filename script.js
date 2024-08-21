document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const input = document.querySelector('input[name="title"]');
    const taskList = document.querySelector('ul.list-group');  

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const taskText = input.value; 
        if(taskText !== '') {
            const newTask = document.createElement('li');
            newTask.className = 'todo list-group-item d-flex align-items-center';

            newTask.innerHTML = `
                <input class="form-check-input" type="checkbox">
                <label class="ms-2 form-check-label">${taskText}</label>
                <label class="ms-auto btn btn-danger btn-sm">
                    <i class="bi-trash"></i>
                </label>
            `;

            taskList.appendChild(newTask);
            input.value = '';
        }
    });
    // handle checkbox click
    taskList.addEventListener('change', function(event) {
        if (event.target.type === 'checkbox') {
            const listItem = event.target.parentElement; 
            if (event.target.checked) {
                listItem.classList.add('checked');
            } else {
                listItem.classList.remove('checked');
            }
        }
    });
    // delete task
    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('bi-trash') ) {
            const listItem = event.target.parentElement.parentElement;
            listItem.remove();
            
        }
    });

});

