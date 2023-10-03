let todoList = document.querySelector(".todoList");
let inputText = document.querySelector("#inputText");
let inputButton = document.querySelector("#inputButton");
let tasksLeft = document.querySelector('#tasksLeft')
let clearList = document.querySelector('#clearList')


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




// User can view todos
function viewtodos() {
  todos.forEach((todo) => {
    let li = document.createElement("li");
    if (todo.todoComplete){li.classList.add('completed')}
    li.textContent = todo.todoText;
    todoList.appendChild(li);
  });
}






// User can add todos
function addtodos() {
  if (inputText.value.length > 1) {
    todos.push({
      todoID: todos.length,
      todoText: inputText.value,
      todoComplete: false,
    });}

    todos.forEach((todo) => {
      todoList.textContent = ''
      viewtodos()
    });
  

console.log(todos)
    inputText.value = "";
  
}


// App shows the user number of todos left to complete
function todosLeft(){
  const filtered = todos.filter((todo) => !todo.todoComplete)
  const filteredLength = filtered.length
  console.log(filteredLength)
  tasksLeft.innerHTML = filteredLength

}


// User can edit todos
function edittodos() {
  const listItems = document.querySelectorAll('li');
 listItems.forEach((listItem) => {


 listItem.addEventListener("dblclick", (e) => {
  console.log(listItem.textContent)
 let editTextBox = document.createElement('input')
 editTextBox.placeholder = listItem.textContent
listItem.replaceWith(editTextBox)

editTextBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
 listItem.textContent = editTextBox.value
 editTextBox.replaceWith(listItem)
  }
});


});

})
  }







inputText.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addtodos();
    todosLeft()
    edittodos();

  }
});

inputButton.addEventListener("click", (e) => {
  addtodos();
  todosLeft()
  edittodos();

});



// User can delete todos
function deleteToDos(){
  const listItems = document.querySelectorAll('li');
  listItems.forEach((listItem) => {
    listItem.addEventListener('click', (e)=>{
      listItem.classList.toggle('completed')
    })
    
  })
} 

function clearalltodos(){
 
  clearList.addEventListener('click', (e => {
    todoList.textContent = ''
    let clearedtodos = []
    todos = clearedtodos
    
  }))
  
  }


viewtodos();
edittodos();
deleteToDos()
clearalltodos()



// App can delete (aka clear) all done todos at once.

