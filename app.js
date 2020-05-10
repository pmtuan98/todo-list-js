// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todos');


//event listener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', modifyTodo);
filterOption.addEventListener('click', filterTodo);

//functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    //todo <div>
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create <li>
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //add todo in local storage
    saveLocalTodos(todoInput.value);
    
    //edit button
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="far fa-edit"></i>'
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value = "";

}

function modifyTodo(event) {
    const item = event.target;
    //check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        if(todo.classList.contains("completed")){
            saveLocalCompletedTodos(todo);
            removeLocalTodos(todo);
        } else {
            const completedTodos = item.parentElement;
            const todos = checkLocalStorage();
            removeCompletedTodos(completedTodos);
            todos.push(todo.innerText);
            localStorage.setItem("todos", JSON.stringify(todos));
        }
        
       
    }
     //delete todo
     if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        const completedTodos = item.parentElement;
        //animation
        todo.classList.add("fall");
        completedTodos.classList.add("fall");
        if(todo.classList.contains("completed")){
            removeCompletedTodos(completedTodos);
            completedTodos.addEventListener('transitionend', function () {
                completedTodos.remove();
            });
        }else {
            removeLocalTodos(todo);
            todo.addEventListener('transitionend', function () {
                todo.remove();
            });
        }
        

    }
    // //edit button
    // if (item.classList[0] === "edit-btn") {
    //     const todo = item.parentElement;
    //     let editInput = document.createElement("input");
    //     let saveButton = document.createElement('button');
    //     saveButton.innerHTML = '<i class="far fa-save"></i>'
    //     saveButton.classList.add("save-btn");
    //     todoList.appendChild(saveButton);
    //     editInput.classList.add("edit-input");
    //     editInput.value = todo.innerText;
    //     let todoItem = todo.firstChild;
    //     todo.replaceChild(editInput,todoItem);
    //     editInput.focus();
        
    // }
}

function filterTodo(event) {
    const todos = Array.from(todoList.children);
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
                break;
        }
    });
}
//check local storage
function checkLocalStorage() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}

function checkCompletedLocalStorage() {
    let completedTodos;
    if(localStorage.getItem('completed-todo') === null) {
        completedTodos = [];
    }else {
        completedTodos = JSON.parse(localStorage.getItem('completed-todo'));
    }
    return completedTodos;
}


function saveLocalTodos(todo) {
    let todos = checkLocalStorage();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function saveLocalCompletedTodos(todo) {
    let completedTodos = checkCompletedLocalStorage();
    if(todo.classList.contains("completed")){
        completedTodos.push(todo.innerText);
        localStorage.setItem("completed-todo", JSON.stringify(completedTodos));
    }
}

function getTodos() {
     let todos = checkLocalStorage();
     todos.forEach(function(todo){
            //todo <div>
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');
            //Create <li>
            const newTodo = document.createElement('li');
            newTodo.innerText = todo;
            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo);
            //edit button
            const editButton = document.createElement('button');
            editButton.innerHTML = '<i class="far fa-edit"></i>'
            editButton.classList.add("edit-btn");
            todoDiv.appendChild(editButton);
            //check mark button
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class="fas fa-check"></i>'
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);
            //check trash button
            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class="fas fa-trash"></i>'
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);

            //append to list
            todoList.appendChild(todoDiv);
     });
     let completedTodos = checkCompletedLocalStorage();
     completedTodos.forEach(function(todo){
            //todo <div>
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');
            todoDiv.classList.add('completed');
            //Create <li>
            const newTodo = document.createElement('li');
            newTodo.innerText = todo;
            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo);
            //edit button
            const editButton = document.createElement('button');
            editButton.innerHTML = '<i class="far fa-edit"></i>'
            editButton.classList.add("edit-btn");
            todoDiv.appendChild(editButton);
            //check mark button
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class="fas fa-check"></i>'
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);
            //check trash button
            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class="fas fa-trash"></i>'
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);

            //append to list
            todoList.appendChild(todoDiv);
     });
}
function removeLocalTodos(todo) {
     //check if have thing in local storage
     let todos = checkLocalStorage();
     const todoIndex = todo.children[0].innerText;
     //1 - remove 1 element
     todos.splice(todos.indexOf(todoIndex), 1);
     localStorage.setItem("todos", JSON.stringify(todos));
}
function removeCompletedTodos(todo) {
    let completedTodos = checkCompletedLocalStorage();
    const todoIndex = todo.children[0].innerText;
    //1 - remove 1 element
    completedTodos.splice(completedTodos.indexOf(todoIndex), 1);
    localStorage.setItem("completed-todo", JSON.stringify(completedTodos));
}