/*
* Todo List App - Javascript Project
* Author - MD Imam Hossain
* Contact - https://www.facebook.com/prantoislam.jim.3/
*           https://www.fiverr.com/imamhossain0049
*           https://github.com/mdimamhossain0049
*/


// Initial Selector
let editButton = document.getElementsByClassName('edit');
let saveButton = document.getElementsByClassName('save');
let deleteButton = document.getElementsByClassName('delete');
let checkBox = document.getElementsByClassName('checkbox');
let taskInput = document.getElementsByClassName('task-input');
let addTodoButton = document.getElementById('add-todo');
let activeTask = document.getElementsByClassName('active-todo')[0];
let completeTask = document.getElementsByClassName('complete-todo')[0];


// Set Local Storage
let storageInit = function()
{
    let getStorage = JSON.parse(localStorage.getItem('todo'));
    if(!getStorage)
    {
        localStorage.setItem('todo', JSON.stringify([]));
    }
}

// Print Data
let printData = function()
{
    let data = JSON.parse(localStorage.getItem('todo'));
    activeTask.innerHTML = '';
    completeTask.innerHTML = '';
    
    for(let i of data)
    {
        if(i.status == 0)
        {
            activeTask.innerHTML += '\n' +
            '<div class="todo-item d-flex justify-content-between align-items-center mb-2" data-id="'+ i.id +'">\n' +
            '   <span class="status"><input type="checkbox" class="form-check-input checkbox" id="item-'+i.id+'"></span>\n' +
            '   <label for="item-'+i.id+'" class="todo-title text me-3">'+ i.task +'</label>\n' +
            '   <input type="text" class="todo-title me-3 form-control task-input" value="'+ i.task +'">\n' +
            '   <span class="action-btn">\n' +
            '       <button class="edit me-1">Edit</button>\n' +
            '       <button class="save me-1">Save</button>\n' +
            '       <button class="delete">Delete</button>\n' +
            '   </span>\n' +
            '</div>\n';
        }
        else {
            completeTask.innerHTML += '\n' +
            '<div class="todo-item d-flex justify-content-between align-items-center mb-2" data-id="'+ i.id +'">\n' +
            '   <span class="status"><input type="checkbox" class="form-check-input checkbox" id="item-'+i.id+'" checked></span>\n' +
            '   <label for="item-'+i.id+'" class="todo-title text me-3">'+ i.task +'</label>\n' +
            '   <input type="text" class="todo-title me-3 form-control task-input" value="'+ i.task +'">\n' +
            '   <span class="action-btn">\n' +
            '       <button class="edit me-1">Edit</button>\n' +
            '       <button class="save me-1">Save</button>\n' +
            '       <button class="delete">Delete</button>\n' +
            '   </span>\n' +
            '</div>\n';
        }
    }
    addEvent();
}

// Add Event Listener
let addEvent = function()
{
    let len = editButton.length;
    for(let i=0; i<len; i++){
        editButton[i].addEventListener('click', editItem);
        saveButton[i].addEventListener('click', saveItem);
        deleteButton[i].addEventListener('click', deleteItem);
        checkBox[i].addEventListener('click', updateStatus);
    }
}

// Generate Task Id
let generateTaskId = function()
{
    let data = JSON.parse(localStorage.getItem('todo'));
    let taskId = data.length + 1;
    return taskId;
}

// Add Todo Task
let addTodo = function(e)
{
    e.preventDefault();
    
    let taskId = generateTaskId();
    let taskText = document.getElementById('task').value;
    let taskStatus = 0;
    let taskData = [];
    let newData = {id:taskId, task:taskText, status:taskStatus};
    let getData = JSON.parse(localStorage.getItem('todo'));

    for(let i of getData){
        taskData.push(i);
    }

    taskData.push(newData);
    localStorage.setItem('todo', JSON.stringify(taskData));
    document.getElementById('task').value = '';
    printData();
}

// Update Status
let updateStatus = function()
{
    let taskId = this.parentElement.parentElement.getAttribute('data-id');
    let getData = JSON.parse(localStorage.getItem('todo'));
    let taskData = [];
    let taskStatus = this.checked == true ? 1 : 0;

    for(let i of getData){
        if(i.id == taskId)
        {
            let newData = {id:i.id, task:i.task, status:taskStatus};
            taskData.push(newData);
        }
        else {
            taskData.push(i);
        }
    }

    localStorage.setItem('todo', JSON.stringify(taskData));
    printData();
}

// Edit Item
let editItem = function()
{
    this.parentElement.parentElement.classList.add('edit-able');
}
let saveItem = function()
{
    this.parentElement.parentElement.classList.remove('edit-able');
    let taskId = this.parentElement.parentElement.getAttribute('data-id');
    let newTaskValue = this.parentElement.parentElement.querySelector('.task-input').value;
    let getData = JSON.parse(localStorage.getItem('todo'));
    let taskData = [];

    for(let i of getData){
        if(i.id == taskId)
        {
            let newData = {id:i.id, task:newTaskValue, status:i.status};
            taskData.push(newData);
        }
        else {
            taskData.push(i);
        }
    }

    localStorage.setItem('todo', JSON.stringify(taskData));
    printData();
}

// Delete Item 
let deleteItem = function()
{
    let taskId = this.parentElement.parentElement.getAttribute('data-id');
    let getData = JSON.parse(localStorage.getItem('todo'));
    let taskData = [];

    for(let i of getData){
        if(i.id == taskId)
        {
            // We don't need push this item
        }
        else if(i.id > taskId) {
            let newId = i.id - 1;
            let newData = {id:newId, task:i.task, status:i.status};
            taskData.push(newData);
        }
        else {
            taskData.push(i);
        }
    }

    localStorage.setItem('todo', JSON.stringify(taskData));
    printData();
}

// Call Function
storageInit();
printData();
addTodoButton.addEventListener('submit', addTodo);
