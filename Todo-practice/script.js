document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const input = document.querySelector('input[name="title"]');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const taskText = input.value; 
        console.log(taskText); 
    });
});

