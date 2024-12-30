const todoInput = document.getElementById('todoInput');
const todoAddBtn = document.getElementById('todoAddBtn');
const resultSection = document.getElementById('resultSection')

const todoList = [];
const completeTodo = [];

todoInput.addEventListener('keypress', (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    todoAddBtn.click();
  }
})

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
    const divText = document.getElementById('divText');

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

todoAddBtn.addEventListener('click', () => {
  const todo = todoInput.value;
  todoInput.value = '';
  todoList.unshift(todo)
  createTodoCardHandler(todoList);
  console.log(todoList)
})

function checkHandler(index) {
  console.log("check index", index)
  if (completeTodo.includes(todoList[index]))
    completeTodo.unshift(todoList[index])
  else
    completeTodo.splice(completeTodo.indexOf(todoList[index], 1))

  divText[index].classList.toggle('complete-todo-content')
}

function deleteHandler(index) {
  console.log('delete index', index)
  todoList.splice(index, 1);
  createTodoCardHandler(todoList)
}