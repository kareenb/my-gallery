'use strict';

var gTodos;
var gTodosFilter = 'all';
var gNextId = 0;

var TODOS_KEY = 'todosApp';

function init() {
    console.log('Todo App');
    gTodos = createTodos();
    renderCounts();
    renderTodos();
    console.log(gNextId)
}

function todoClicked(elTodo, todoId) {
    gTodos.forEach(function (todo) {
        if (todo.id === todoId) {
            todo.isDone = !todo.isDone;
            elTodo.classList.toggle('done');
            renderCounts();
            saveToStorage(TODOS_KEY, gTodos);
        }
    });
}

function deleteTodo(ev, todoId) {
    ev.stopPropagation();
    gTodos.forEach(function (todo, todoIdx) {
        if (todo.id === todoId) {
            gTodos.splice(todoIdx, 1);
            renderTodos();
            renderCounts();
            saveToStorage(TODOS_KEY, gTodos);
        }
    });
}

function addTodo() {
    var todoTxt = document.querySelector('.addTodoModal span:first-child input').value;
    if (!todoTxt) {
        toggleModal();
        return
    }
    updateIdCounter();
    var newTodo = createTodo(todoTxt);
    gTodos.unshift(newTodo);
    renderCounts();

    setFilter('all');

    saveToStorage(TODOS_KEY, gTodos);

    toggleModal();
}

function updateIdCounter() {
    gTodos.forEach(function (todo) {
        if (todo.id > gNextId) gNextId = todo.id;
    });
}

function setFilter(strFilter) {
    var elPrevFilterBtn = document.querySelector(`button.${gTodosFilter}`);
    if (elPrevFilterBtn.classList.contains(`${strFilter}`)) {
        renderTodos();
        return;
    }
    else {
        elPrevFilterBtn.classList.remove('pressed');
        gTodosFilter = strFilter;
        var elFilterBtn = document.querySelector(`button.${strFilter}`);
        elFilterBtn.classList.add('pressed');
        renderTodos();
    }
}

function sortTodos(strSort) {
    if (strSort === 'alphabet') {
        gTodos.sort(function (a, b) {
            var txtA = a.txt.toUpperCase();
            var txtB = b.txt.toUpperCase();
            if (txtA < txtB) return -1;
            if (txtA > txtB) return 1;
            return 0;
        });
    } else if (strSort === 'date') {
        gTodos.sort(function (a, b) {
            return a.createdAt - b.createdAt;
        })
    } else {
        gTodos.sort(function (a, b) {
            return a.importance - b.importance;
        })
    }
    renderTodos();
}

function renderTodos() {
    var strHTML = ''

    var todos = getTodosForDisplay()
    renderCounts();

    var elInfoHeader = document.querySelector('.container h2');
    if (todos.length === 0) {
        switch (gTodosFilter) {
            case 'all':
                elInfoHeader.innerText = 'You don\'t have any ToDo\'s';
                elInfoHeader.classList.remove('hidden');
                break;

            case 'active':
                elInfoHeader.innerText = 'You have no active ToDo\'s';
                elInfoHeader.classList.remove('hidden');
                break;

            case 'done':
                elInfoHeader.innerText = 'All your ToDo\'s are active';
                elInfoHeader.classList.remove('hidden');
                break;
        }
    } else {
        if (!elInfoHeader.classList.contains('hidden')) elInfoHeader.classList.add('hidden');
        todos.forEach(function (todo, todoIdx) {
            var className = (todo.isDone) ? 'done' : '';
            var todoDate = new Date(todo.createdAt);
            strHTML +=
                `<div class="todo-div">
                    <li class="todo ${className}" onclick="todoClicked(this, ${todo.id})">
                        <button class="btn arrow`
            if (todoIdx === 0) {
                strHTML += ` hidden`;
            }
            strHTML +=
                `" onclick="changeTodoLocation(event, ${todoIdx}, 'up')">▲</button>
                        <button class="btn arrow`
            if (todoIdx === todos.length - 1) {
                strHTML += ` hidden`;
            }
            strHTML +=
                `" onclick="changeTodoLocation(event, ${todoIdx}, 'down')">▼</button>    
                        <span class="importance">${todo.importance}</span>
                        <span class="text">${todo.txt}</span>
                        <span class="floated">
                        <span class="date">
                            ${todoDate.getDate()}.${todoDate.getMonth() + 1}.${todoDate.getFullYear()}, ${todoDate.getHours()}:${todoDate.getMinutes()}
                        </span>                        
                        <button class="btn btn-danger" onclick="deleteTodo(event, ${todo.id})">X</button> </span>
                    </li>
                </div>`
        });
    }

    document.querySelector('.todos').innerHTML = strHTML;

    if (gTodosFilter !== 'all') {
        var elArrowBtns = document.querySelectorAll('.arrow');
        for (var i = 0; i < elArrowBtns.length; i++) {
            elArrowBtns[i].classList.add('hidden');
        }
    }
}

function changeTodoLocation(ev, todoIdx, direction) {
    ev.stopPropagation();
    var placeHolder = gTodos[todoIdx];
    if (direction === 'up') {
        gTodos[todoIdx] = gTodos[todoIdx - 1];
        gTodos[todoIdx - 1] = placeHolder;
    } else {
        gTodos[todoIdx] = gTodos[todoIdx + 1];
        gTodos[todoIdx + 1] = placeHolder;
    }
    renderTodos();
}

function createTodos() {
    var todos = loadFromStorage(TODOS_KEY);
    if (todos) return todos;

    todos = [];

    todos.push(createTodo('Buy groceries'))
    todos.push(createTodo('Homework'))
    todos.push(createTodo('Master CSS'))

    return todos;
}

function createTodo(txt) {
    return {
        id: ++gNextId,
        txt: txt,
        isDone: false,
        importance: getImportanceLevel(),
        createdAt: Date.now()
    }
}

function getImportanceLevel() {
    var importanceLevel = document.querySelector('.addTodoModal span:nth-child(2) input').value;
    if (isNaN(importanceLevel) ||
        importanceLevel < 1 ||
        importanceLevel > 3) return 3;
    else return importanceLevel;
}

function toggleModal() {
    var elModal = document.querySelector('.addTodoModal');
    elModal.classList.toggle('opaque');
    document.querySelector('.addTodoModal span:first-child input').value = '';
    document.querySelector('.addTodoModal span:nth-child(2) input').value = '';
}

function renderCounts() {
    var activeCount = 0;
    var doneCount = 0;
    gTodos.forEach(function (todo) {
        if (!todo.isDone) {
            activeCount++;
            doneCount = gTodos.length - activeCount;
        }
    })

    document.querySelector('.total-count').innerText = gTodos.length;
    if (gTodosFilter === 'all' || gTodosFilter === 'active') document.querySelector('h4').innerText = activeCount + ' active ToDo\'s left';
    if (gTodosFilter === 'done') document.querySelector('h4').innerText = doneCount + ' done ToDo\'s';
}

function getTodosForDisplay() {
    var todos = [];
    gTodos.forEach(function (todo) {
        if (gTodosFilter === 'all' ||
            (gTodosFilter === 'active' && !todo.isDone) ||
            (gTodosFilter === 'done' && todo.isDone)) {
            todos.push(todo);
        }
    });
    console.log(todos);
    return todos;
}