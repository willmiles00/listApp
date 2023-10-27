const todoList = document.querySelector(".todoList");
const addBtn = document.querySelector(".addBtn")
const inputText = document.querySelector(".inputText")
const tasksleft = document.querySelector("#tasksLeft")
const editInput = document.createElement('input');
const editBox = document.querySelector('#editbox');
const clearList = document.querySelector('#clearList')
const categoriesSection = document.querySelector("#categoriesSection")
const categoriesInput = document.querySelector(".categoriesInput")


//inital todos
let todos = [
  {
    todoID: 0,
    todoText: "Finish Homework",
    todoComplete: false,
    categories: [2],
  },
  {
    todoID: 1,
    todoText: "Walk the dog",
    todoComplete: true,
    categories: [1],
  },
  {
    todoID: 2,
    todoText: "Clean my room",
    todoComplete: false,
    categories: [2, 1, 0,],
  },
];


// User can add todos
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



function addToDo(todoText){
  todos.push({
    todoID: todos.length +1,
    todoText,
    todoComplete: false,
    categories: [],
  })
}

// User can view todos
function viewtodos(todos) {

  todoList.innerHTML = ''

  todos.forEach(todo => {
    
    const done = todo.todoComplete ? 'done' : ''

    const li = `<div data-todoID='${todo.todoID}' class='liData'>
    <li class='${done}' data-todoID='${todo.todoID}' data-todoText='${todo.todoText}'>
${todo.todoText} 
</li>
<img data-pencilText='${todo.todoText}' class='actionbtn' src="media/pencil-solid.svg" height="20">
<img data-trashID='${todo.todoID}' class='actionbtn' src="media/trash-solid.svg" height="20">
<button data-categoriesBtn='${todo.todoID}'>Categories</button>

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
 
  }
 })

function editTodo(todoText){
  let todoIndex = todos.findIndex(todo => todo.todoText === todoText)
  todos[todoIndex].todoText = editBox.textContent
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
todoList.addEventListener('click', (event) =>{
  if (event.target.dataset.trashid != undefined){
 let clickedID = event.target.dataset.trashid

    deleteTodo(parseInt(clickedID, 10))
    viewtodos(todos)
  }
})

function deleteTodo(clickedID){
const filteredArray = todos.filter((todo) => {
 return todo.todoID !== clickedID
})
todos = filteredArray
}


//user can clear completed tasks
clearList.addEventListener('click', (event) => {
clearCompleted()
viewtodos(todos)
})

function clearCompleted(){
const filteredArray = todos.filter((todo) => {
  return todo.todoComplete !== true
})
todos = filteredArray
}




viewtodos(todos);


//Categories schtuff


//initial categories
let categories = [
  {
    categoryID: 0,
    categoryText: "School",
  },
  {
    categoryID: 1,
    categoryText: "Work",
  },
  {
    categoryID: 2,
    categoryText: "Home",
  },
];

//User can view categories
function viewCategories(categories) {

  categoriesSection.innerHTML = ''
  categories.forEach(category => {
    

    const li = `<div data-todoID='${category.categoryID}' class='liData'>
    <li  data-todoID='${category.categoryID}' data-todoText='${category.categoryText}'>
${category.categoryText} 
</li>
</div>
`

categoriesSection.insertAdjacentHTML("beforeend", li)
  });
}

// user can add categories
categoriesInput.addEventListener('keypress', (e) =>{
  if (e.key === 'Enter') {
  const newCategory = categoriesInput.value
  addCategory(newCategory)
  viewCategories(categories)
  categoriesInput.value = ''
  }
})

function addCategory(categoryText){
  categories.push({
    categoryID: categories.length +1,
    categoryText,
  })

}

// user can edit categories
// user can delete categories
viewCategories(categories)


todoList.addEventListener('click', (event)=>{
 if (event.target.dataset.categoriesbtn != undefined){
  let eventID = event.target.dataset.categoriesbtn
  let todoCategoryFetcher = todos.forEach((todo)=> {
   if (eventID == todo.todoID){let correspondingCategory =  todo.categories
    console.log(correspondingCategory)
    correspondingCategory.forEach((category)=>{
      console.log(categories[category].categoryText)
    })

   
    //I need to use filter... I think...
  }
  })

  
 }})