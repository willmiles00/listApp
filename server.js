const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

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

//app.get
app.get('/api/todo', (req, res) => {
  res.send(todos)
})


//app.post
app.post('/api/todo', (req, res) => {

todos.push( {
    todoID: todos.length + 1,
    todoText: req.body.todo,
    todoComplete: false,
    categories: []
  })

    res.send(todos)
  })

  // PUT TODO (update)
app.put('/api/todo', (req, res) => { 
  todos.push( {
    todoID: todos.length + 1,
    todoText: req.body.todo,
    todoComplete: false,
    categories: []
  })

    res.send(todos)
  })

  // DELETE TODO
  app.delete('/api/todo', (req, res) => { 
    function deleteTodo(todoID) {
      const filteredArray = todos.filter((todo) => {
        return todo.todoID !== todoID;
      });
      todos = filteredArray;
    }
      deleteTodo(1)
  
      res.send(todos)
    })

// GET ALL TODOS for a CATEGORY
app.get('/api/todo/category', (req, res) => {
  function todosFilteredByCategory(categoryID) {
    const filtered = todos.filter((todo) => {
      return todo.categories.includes(categoryID);
    });
    return filtered;
  }

  const filteredTodos = todosFilteredByCategory(1);
  res.send(filteredTodos);
});

// GET CATEGORIES
app.get('/api/categories', (req, res) => {
  res.send(categories)
})


//  POST CATEGORIES
app.post('/api/categories', (req, res) => {
  categories.push( {
    categoryID: categories.length + 1,
    categoryText: req.body.category,
  })

  res.send(categories)
})

//  PUT CATEGORIES (update) 
app.put('/api/categories', (req, res) => {
  categories.push( {
    categoryID: categories.length + 1,
    categoryText: req.body.category,
  })

  res.send(categories)
})

// DELETE CATEGORIES
app.delete('/api/categories', (req, res) => { 
  function deleteCategory(categoryID) {
    const filteredArray = categories.filter((category) => {
      return category.categoryID !== categoryID;
    });
    categories = filteredArray;
  }
    deleteCategory(1)

    res.send(categories)
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})





