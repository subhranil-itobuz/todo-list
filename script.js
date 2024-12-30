const todoInput = document.getElementById('todoInput');
const todoAddBtn = document.getElementById('todoAddBtn');
const resultSection = document.getElementById('resultSection')

const todoList = [];
let todoCardText = ''

todoInput.addEventListener('keypress', (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    todoAddBtn.click();
  }
})

const createTodoCardHandler = () => {
  const divElement = document.createElement("div");
  divElement.setAttribute('class', 'result-card-style')
  divElement.setAttribute('id', 'divCard')
  const divCard = document.getElementById('divCard')

  const divButton = document.createElement('div')
  divButton.setAttribute('class', 'result-card-button')

  const todoText = document.createTextNode(todoList[0])

  const checkButtonElement = document.createElement("button")
  checkButtonElement.innerHTML = '&check;'
  checkButtonElement.setAttribute('class', 'result-card-button-style')
  checkButtonElement.setAttribute('id', 'checkBtn')
  checkButtonElement.setAttribute('onClick', "checkHandler()")

  const deleteButtonElement = document.createElement("button")
  deleteButtonElement.innerHTML = '&#x2715;'
  deleteButtonElement.setAttribute('class', 'result-card-button-style')
  deleteButtonElement.setAttribute('id', 'deleteBtn')
  deleteButtonElement.setAttribute('onClick', 'deleteHandler()')

  divElement.appendChild(todoText)
  divButton.appendChild(checkButtonElement)
  divButton.appendChild(deleteButtonElement)
  divElement.appendChild(divButton)
  resultSection.prepend(divElement)
}

todoAddBtn.addEventListener('click', () => {
  const todo = todoInput.value;
  todoInput.value = '';
  todoList.unshift(todo)
  createTodoCardHandler();
  console.log(todoList)
})

function checkHandler() {
  console.log("check")
}

function deleteHandler() {
  console.log('delete')
}

