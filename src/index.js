const todoList = document.querySelector(".todoList");
const addBtn = document.querySelector(".addBtn")
const inputText = document.querySelector(".inputText")
const tasksleft = document.querySelector("#tasksLeft")


addBtn.addEventListener('click', () =>{
  const newTask = inputText.value
  addToDo(newTask)
  viewtodos(todos)
  inputText.value = ''
})

inputText.addEventListener('keypress', (e) =>{
  if (e.key === 'Enter') {
  const newTask = inputText.value
  addToDo(newTask)
  viewtodos(todos)
  inputText.value = ''
  }
})

//inital todos
let todos = [
  {
    todoID: 0,
    todoText: "Finish Homework",
    todoComplete: false,
  },
  {
    todoID: 1,
    todoText: "Walk the dog",
    todoComplete: true,
  },
  {
    todoID: 2,
    todoText: "Clean my room",
    todoComplete: false,
  },
];


// User can add todos
function addToDo(todoText){
  todos.push({
    todoID: todos.length,
    todoText,
    todoComplete: false,
  })

}

// User can view todos
function viewtodos(todos) {

  todoList.innerHTML = ''

  todos.forEach(todo => {
    
    const done = todo.todoComplete ? 'done' : ''

    const li = `<div class='liData'>
    <li class='${done}' data-todoID='${todo.todoID}' data-todoText='${todo.todoText}'>
${todo.todoText} 
</li>
<img data-pencilText='${todo.todoText}' class='actionbtn' src="media/pencil-solid.svg" height="20">
<img data-trashID='${todo.todoID}' class='actionbtn' src="media/trash-solid.svg" height="20">
</div>
`

todoList.insertAdjacentHTML("beforeend", li)
  });

// App shows the user number of todos left to complete
  let remainingTodos = todos.filter(todo => !todo.todoComplete).length
tasksleft.innerHTML = remainingTodos
}







// User can edit todos
todoList.addEventListener('click', (event) => {
  if (event.target.dataset.penciltext != undefined){
  let pencilText = event.target.dataset.penciltext
  editTodo(pencilText)
  viewtodos(todos)
  console.log(todos)
  }
 })

function editTodo(todoText){
  let todoIndex = todos.findIndex(todo => todo.todoText === todoText)
  todos[todoIndex].todoText = 'waaah the text has changed'
  }

 //User can mark todos as complete
todoList.addEventListener('click', (event) => {
  if (event.target.dataset.todoid != undefined){
  let clickedID = event.target.dataset.todoid
  toggleTodo(parseInt(clickedID, 10))
  viewtodos(todos)
  }
 })


function toggleTodo(todoID){
  let todoIndex = todos.findIndex(todo => todo.todoID === todoID)
  todos[todoIndex].todoComplete = !todos[todoIndex].todoComplete
  }

// User can delete todos



viewtodos(todos);



// App can delete (aka clear) all done todos at once.

