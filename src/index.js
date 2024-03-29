const todoList = document.querySelector(".todoList");
const addBtn = document.querySelector(".addBtn");
const inputText = document.querySelector(".inputText");
const tasksleft = document.querySelector("#tasksLeft");
const editInput = document.createElement("input");
const editBox = document.querySelector("#editbox");
const clearList = document.querySelector("#clearList");
const categoriesSection = document.querySelector("#categoriesSection");
const categoriesInput = document.querySelector(".categoriesInput");

//inital todos
let todos = [
  {
    todoID: 0,
    todoText: "Finish Homework",
    todoComplete: false,
    categories: [0],
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
    categories: [2, 1, 0],
  },
];

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

// User can add todos
addBtn.addEventListener("click", () => {
  const newTask = inputText.value;
  addToDo(newTask);
  viewtodos(todos);
  inputText.value = "";
});

inputText.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const newTask = inputText.value;
    addToDo(newTask);
    viewtodos(todos);
    inputText.value = "";
  }
});

function addToDo(todoText) {
  todos.push({
    todoID: todos.length + 1,
    todoText,
    todoComplete: false,
    categories: [],
  });
}

// User can view todos
function viewtodos(todos) {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    //adds categories to each new todo
    const categoriesForEachToDo = categories.filter((category) => {
      return todo.categories.includes(category.categoryID);
    });

    const categoriesButtons = categoriesForEachToDo.map((category) => {
      return `<button>${category.categoryText}</button>`;
    });

    const done = todo.todoComplete ? "done" : "";

    const li = `<div data-todoID='${todo.todoID}' class='liData'>
    <li class='${done}' data-todoID='${todo.todoID}' data-todoText='${todo.todoText}'>
${todo.todoText} 
</li>
<img data-pencilText='${todo.todoText}' class='actionbtn' src="media/pencil-solid.svg" height="20">
<img data-trashID='${todo.todoID}' class='actionbtn' src="media/trash-solid.svg" height="20">
${categoriesButtons}
<button data-categoriesBtn='${todo.todoID}'>Add a Category</button>
</div>
`;

    todoList.insertAdjacentHTML("beforeend", li);
  });

  // App shows the user number of todos left to complete
  let remainingTodos = todos.filter((todo) => !todo.todoComplete).length;
  tasksleft.innerHTML = remainingTodos;
}

// User can edit todos
todoList.addEventListener("click", (event) => {
  if (event.target.dataset.penciltext != undefined) {
    let pencilText = event.target.dataset.penciltext;

    editTodo(pencilText);
    viewtodos(todos);
  }
});

function editTodo(todoText) {
  let todoIndex = todos.findIndex((todo) => todo.todoText === todoText);
  todos[todoIndex].todoText = editBox.textContent;
}

//User can mark todos as complete
todoList.addEventListener("click", (event) => {
  if (event.target.dataset.todoid != undefined) {
    let clickedID = event.target.dataset.todoid;
    toggleTodo(parseInt(clickedID, 10));
    viewtodos(todos);
  }
});

function toggleTodo(todoID) {
  let todoIndex = todos.findIndex((todo) => todo.todoID === todoID);
  todos[todoIndex].todoComplete = !todos[todoIndex].todoComplete;
}

// User can delete todos
todoList.addEventListener("click", (event) => {
  if (event.target.dataset.trashid != undefined) {
    let clickedID = event.target.dataset.trashid;

    deleteTodo(parseInt(clickedID, 10));
    viewtodos(todos);
  }
});

function deleteTodo(clickedID) {
  const filteredArray = todos.filter((todo) => {
    return todo.todoID !== clickedID;
  });
  todos = filteredArray;
}

//user can clear completed tasks
clearList.addEventListener("click", (event) => {
  clearCompleted();
  viewtodos(todos);
});

function clearCompleted() {
  const filteredArray = todos.filter((todo) => {
    return todo.todoComplete !== true;
  });
  todos = filteredArray;
}

viewtodos(todos);

//Categories schtuff

//User can view categories
function viewCategories(categories) {
  categoriesSection.innerHTML = "";
  categories.forEach((category) => {
    const li = `
    <input type='checkbox' data-categoryID='${category.categoryID}' data-categoryText='${category.categoryText}'>
${category.categoryText} 
</input>
`;

    categoriesSection.insertAdjacentHTML("beforeend", li);
  });
}

//user can filter by categories
categoriesSection.addEventListener("change", (event) => {
  if (event.target.dataset.categoryid != undefined) {
    let clickedID = event.target.dataset.categoryid;
    filterCategories(clickedID);
  }
});

function filterCategories(clickedID) {
  const checkedCategories = [];

  for (const checkbox of categoriesSection.querySelectorAll(
    'input[type="checkbox"]:checked'
  )) {
    const categoryID = parseInt(checkbox.dataset.categoryid, 10);
    checkedCategories.push(categoryID);
  }

  todosFilteredByCategory = todos.filter((todo) => {
    return checkedCategories.every((category) =>
      todo.categories.includes(category)
    );
  });
  viewtodos(todosFilteredByCategory);
}

// const categoriesForEachToDo = categories.filter((category) =>  {
//   return todo.categories.includes(category.categoryID)
// })

// user can add categories to the category list
categoriesInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const newCategory = categoriesInput.value;
    addCategory(newCategory);
    viewCategories(categories);
    categoriesInput.value = "";
  }
});

function addCategory(categoryText) {
  categories.push({
    categoryID: categories.length,
    categoryText,
  });
}

// user can add category to a todo
// todoList.addEventListener('click', (event =>{
//   addCategoryToTodo(event)
// }))

//have a drop down with every category not associated with the todo task
//clicking on a task adds it to the categories of the todo

// user can edit categories
// user can delete categories
viewCategories(categories);

todoList.addEventListener("click", (event) => {
  if (event.target.dataset.categoriesbtn != undefined) {
    let eventID = event.target.dataset.categoriesbtn;
    addCategoryToTodo(eventID);
  }
});

function addCategoryToTodo(eventID) {
  todos.forEach((todo) => {
    if (eventID == todo.todoID) {
      let correspondingCategories = todo.categories;
      let allCategories = categories.map((category) => category.categoryID);
      let categoriesNotYetAddedToThisTodo = allCategories.filter(
        (category) => !correspondingCategories.includes(category)
      );
      let notYetAddedCategories = categories.filter((category) =>
        categoriesNotYetAddedToThisTodo.includes(category.categoryID)
      );
      let unaddedCategoryNames = notYetAddedCategories.map(
        (category) => category.categoryText
      );

      unaddedCategoryNames.forEach((category) =>{console.log(category)})

  
      
    }
  });
}
