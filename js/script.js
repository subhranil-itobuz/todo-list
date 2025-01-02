//this file is for array of elements.
const todoInput = document.getElementById('todoInput');
const todoAddBtn = document.getElementById('todoAddBtn');
const resultSection = document.getElementById('resultSection')
const allBtn = document.getElementById('allBtn')
const activeBtn = document.getElementById('activeBtn')
const completeBtn = document.getElementById('completeBtn')
const clearBtn = document.getElementById('clearBtn')

const todoList = [];
const completeTodo = [];

//Enter to submit
todoInput.addEventListener('keypress', (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    todoAddBtn.click();
  }
})

//creating todo cards function
const createTodoCardHandler = (todoArr) => {
  resultSection.innerHTML = '';
  todoArr.map((value, index) => {
    const divElement = document.createElement("div");
    const divContent = document.createElement("p");
    const divButton = document.createElement('div');
    const checkButtonElement = document.createElement("button");
    const deleteButtonElement = document.createElement("button");


    divElement.setAttribute('class', 'result-card-style')
    divElement.setAttribute('id', 'divCard')
    const divCard = document.getElementById('divCard')

    divContent.textContent = value;
    divContent.setAttribute('id', 'divText');
    divContent.setAttribute('class', 'm-0');
    divContent.setAttribute('class', 'div-text-content');

    if (completeTodo.includes(value))
      divContent.setAttribute('class', 'complete-todo-content')

    divButton.setAttribute('class', 'result-card-button')

    checkButtonElement.innerHTML = '&check;'
    checkButtonElement.setAttribute('class', 'result-card-button-style')
    checkButtonElement.setAttribute('id', 'checkBtn')
    checkButtonElement.setAttribute('onClick', `checkHandler(${index})`)

    deleteButtonElement.innerHTML = '&#x2715;'
    deleteButtonElement.setAttribute('class', 'result-card-button-style')
    deleteButtonElement.setAttribute('id', 'deleteBtn')
    deleteButtonElement.setAttribute('onClick', `deleteHandler(${index})`)

    divElement.appendChild(divContent)
    divButton.appendChild(checkButtonElement)
    divButton.appendChild(deleteButtonElement)
    divElement.appendChild(divButton)
    resultSection.append(divElement)
  })
}

//add todo eventlistener
todoAddBtn.addEventListener('click', () => {
  const todo = todoInput.value.trim();
  if (todo !== '' && !todoList.includes(todo)) {
    todoList.unshift(todo)
    createTodoCardHandler(todoList);
  }

  else if (todoList.includes(todo)) {
    alert('Todo Already Exists')
  }

  todoInput.value = '';
})

//complete checking line through function
function checkHandler(index) {
  if (completeTodo.includes(todoList[index])) {
    completeTodo.splice(completeTodo.indexOf(todoList[index]), 1)
  }

  else {
    completeTodo.unshift(todoList[index])
  }
  
  resultSection.children[index].children[0].classList.toggle('complete-todo-content')
}

//delete todo card function
function deleteHandler(index) {
  let confirmDel = confirm('Are you sure you want to delete?')

  if (confirmDel) {
    todoList.splice(index, 1);
    createTodoCardHandler(todoList)
  }
}

//view all todo event listener
allBtn.addEventListener('click', () => {
  createTodoCardHandler(todoList)
})

//view only active todos event listeners
activeBtn.addEventListener('click', () => {
  const activeTodoList = todoList.filter((value) => completeTodo.indexOf(value) === -1)
  createTodoCardHandler(activeTodoList)
})

//view completed todos eventlisteners 
completeBtn.addEventListener('click', () => {
  if (completeTodo.length === 0)
    resultSection.innerHTML = 'No Completed Todos to display'
  else
    createTodoCardHandler(completeTodo)
})

//clear all completed todos event listeners
clearBtn.addEventListener('click', () => {
  console.log('active todos--->', todoList)
  console.log('complete todo--->', completeTodo)

  for (let i = 0; i < todoList.length; i++) {
    if(todoList.includes(completeTodo[i])){
      todoList.splice(todoList.indexOf(completeTodo[i]), 1)
      console.log('after splice--->', todoList)
    }
  }
  createTodoCardHandler(todoList);
  completeTodo.splice(0, completeTodo.length)

  console.log('active todos--->', todoList)
  console.log('complete todo--->', completeTodo)
})