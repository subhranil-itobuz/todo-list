const todoInput = document.getElementById('todoInput');
const todoAddBtn = document.getElementById('todoAddBtn');
const resultSection = document.getElementById('resultSection')
const allBtn = document.getElementById('allBtn')
const activeBtn = document.getElementById('activeBtn')
const completeBtn = document.getElementById('completeBtn')
const clearBtn = document.getElementById('clearBtn')

const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
let currentBtnCheck = '';

//function to create todo card
function createTodoCardHandler(title, check, index) {
  const divElement = document.createElement("div");
  const divContent = document.createElement("p");
  const divButton = document.createElement('div');
  const checkButtonElement = document.createElement("button");
  const deleteButtonElement = document.createElement("button");

  divElement.setAttribute('class', 'result-card-style')

  divContent.textContent = title;
  divContent.setAttribute('class', `${check ? 'complete-todo-content div-text-content my-auto' : 'div-text-content my-auto'}`)

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
}

//function to show todo cards
function showTodoList() {
  resultSection.innerHTML = '';

  if (currentBtnCheck === '' || currentBtnCheck === 'all' || currentBtnCheck === 'clear') {
    todoList.forEach(({ title, check }, index) => createTodoCardHandler(title, check, index))
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }

  else if (currentBtnCheck === 'active') {
    todoList.map(({ title, check }, index) => {
      if (!check) createTodoCardHandler(title, check, index)
    })
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }

  else if (currentBtnCheck === 'complete') {
    todoList.filter(({ title, check }, index) => {
      if (check) {
        createTodoCardHandler(title, check, index)
      }
    })
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }
}

//add todo eventlistener
todoAddBtn.addEventListener('click', () => {
  const todo = todoInput.value.trim();
  todoInput.value = '';

  if (todo !== '' && (todoList.findIndex(({ title }) => title === todo) === -1)) {
    todoList.unshift({ title: todo, check: false });
    localStorage.setItem('todoList', JSON.stringify(todoList))
    currentBtnCheck = ''
    showTodoList()
  }

  else if (todo === '') alert('Todo Required')

  else alert('Todo is Already Exists.')
})

//delete todo card function
function deleteHandler(index) {
  if (confirm('Are you sure you want to delete?')) {
    todoList.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(todoList))
    showTodoList();
  }
}

//completed line through checking
function checkHandler(index) {
  todoList[index].check = !todoList[index].check
  localStorage.setItem('todoList', JSON.stringify(todoList))
  showTodoList()
}

//Enter to submit
todoInput.addEventListener('keypress', (e) => { 
  if (e.key === "Enter") todoAddBtn.click(); 
})

//view all todo event listener
allBtn.addEventListener('click', () => {
  currentBtnCheck = 'all'
  showTodoList()
})

//view only active todos event listeners
activeBtn.addEventListener('click', () => {
  currentBtnCheck = 'active'
  showTodoList();
})

//view only completed todos event listeners
completeBtn.addEventListener('click', () => {
  currentBtnCheck = 'complete'
  showTodoList();
})

//clear all complete todo event listener
clearBtn.addEventListener('click', () => {
  currentBtnCheck = 'clear'
  let index = 0;
  while (index < todoList.length) {
    if (todoList[index].check === true) todoList.splice(index, 1);
    else index++;
  }
  // console.log(todoList);
  localStorage.setItem('todoList', JSON.stringify(todoList))
  showTodoList()
})

showTodoList()