const inputTask = document.querySelector('.input-task');
const btnTask = document.querySelector('.btn-task');
const tasks = document.querySelector('.tasks');

function createLi() {
    const li = document.createElement('li');
    return li;
}

// Get the task value and sens to the li
function createTask(textInput) {
    const li = createLi();
    li.innerText = textInput;
    tasks.appendChild(li);
    cleanInput();
    createDelButton(li);
    saveTask("oi");
}

// Enable button function
btnTask.addEventListener('click', function() {
    if (!inputTask.value) return;
    createTask(inputTask.value);
});

// Enable Enter command
inputTask.addEventListener('keypress', function(e){
    if (e.key === "Enter") {
        if (!inputTask.value) return;
        createTask(inputTask.value);
    }
});

// Clean input 
function cleanInput() {
    inputTask.value = '';
    inputTask.focus();
};

function createDelButton(li) {
    li.innerText += " ";
    const delButton = document.createElement('button');
    delButton.innerText = 'x';
    delButton.setAttribute('class', 'del')
    li.appendChild(delButton);
};

// Listener del button click
document.addEventListener('click', function(e){
    const el = e.target;

    if (el.classList.contains('del')){
        el.parentElement.remove();
        saveTask();
    }
});

function saveTask(oi) {
    console.log(oi);
    const liTasks = tasks.querySelectorAll('li');
    const taskList = [];

    for (let task of liTasks){
        let textTask = task.innerText;
        textTask = textTask.replace("x", '').trim();
        taskList.push(textTask);
    }
    const tasksJSON = JSON.stringify(taskList);
    localStorage.setItem('tasks', tasksJSON);
    console.log(tasksJSON);
}

// Get 
function addLocalTasks() {
    const tasks = localStorage.getItem('tasks');
    const taskList = JSON.parse(tasks);

    for(let task of taskList){
        createTask(task);
    }
}

addLocalTasks();