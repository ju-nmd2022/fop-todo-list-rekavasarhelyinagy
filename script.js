window.addEventListener("load", () => {
    todos = JSON.parse(localStorage.getItem("todos")) || []; //->todos  is a global variable //if there is any todos saved in the localStorage, we will get those
    const nameInput = document.querySelector("#name");
    const newTodoForm = document.querySelector("#new-todo-form");
  
    const username = localStorage.getItem("username") || "";
  
    nameInput.value = username; //it saves the username part ito the localStorage
  
    nameInput.addEventListener("change", (e) => {      //listenes to any changes that is made
      localStorage.setItem("username", e.target.value); //the value changes(=the inputted username in this case)
    });
  
    newTodoForm.addEventListener("submit", e => {
      e.preventDefault();     //??
  
      const todo = {
        content: e.target.elements.content.value, //the new todo task you write into the input form
        category: e.target.elements.category.value,
        done: false,
        createdAt: new Date().getTime() // ??
      };
  
      todos.push(todo); //this is our global variable created at the very top, adding a new todo array
  
      localStorage.setItem("todos", JSON.stringify(todos)); //turns the array into a JSON string, you can store this string in the localStorage     //sidenote: localStorage can only store primitive values like strings, numbers, floats...
  
      e.target.reset(); //we are reseting the target = having the dot in the other circle in the category part
  
      DisplayTodos() //because we want the todos to be displayed on the screen, here we create the eventlistener to it, below we create a function for it
    })
  
      DisplayTodos()
  });
  
  function DisplayTodos() {       //this is where we will "push" our new todos
    const todoList = document.querySelector("#todo-list");
    todoList.innerHTML = ""; //empty, because every time we wanna call display ToDos, we wanna clear all the elements
  
    todos.forEach((todo) => {
      const todoItem = document.createElement("div"); //we create a new div inHTML
      todoItem.classList.add("todo-item"); //within that div, we add a class 'todo-item'
  
      const label = document.createElement("label"); //in these lines we create the HTML elemments within the 'todo-items' classed div
      const input = document.createElement("input");
      const span = document.createElement("span");
      const content = document.createElement("div");
      const actions = document.createElement("div");
      const edit = document.createElement("button");
      const deleteButton = document.createElement("button");
  
      input.type = "checkbox";
      input.checked = todo.done; //it checks is the checkbox is checked or not
      span.classList.add("bubble");
  
      if (todo.category == "personal") {
        //if the category is personal, it adds to the 'personal' class to it
        span.classList.add("personal");
      } else {
        span.classList.add("business"); //if the category is business, it adds to the 'business' class to it
      }
  
      content.classList.add("todo-content"); //here we add the classes
      actions.classList.add("actions");
      edit.classList.add("edit");
      deleteButton.classList.add("delete");
  
      content.innerHTML = `<input type="text" value="${todo.content}" readonly>`; //here we change the content of the content input
      edit.innerHTML = "Edit";
      deleteButton.innerHTML = "Delete";
  
      label.appendChild(input); //here we append(=attach) an input as a Child to the label, and adding the other things in the same way below
      label.appendChild(span);
      actions.appendChild(edit); //it appends the edit button
      actions.appendChild(deleteButton); //it appends the delete button
      todoItem.appendChild(label);
      todoItem.appendChild(content);
      todoItem.appendChild(actions);
  
      todoList.appendChild(todoItem);
  
      if (todo.done) {
        todoItem.classList.add("done"); //here we add the css style for the "done" tasks
      }
  
      input.addEventListener("change", (e) => {   //creating an eventListener on click
        todo.done = e.target.checked; //here we check if the checkbox before the todo item is checked
        localStorage.setItem("todos", JSON.stringify(todos)); //everytime it happens, we wanna set it to localStorage
  
        if (todo.done) {
          todoItem.classList.add("done"); //if the checkbox is checked, we add the 'done' css stxle for it
        } else {
          todoItem.classList.remove("done"); //if not, we're gonna remove the 'done' css style from it
        }
  
        DisplayTodos(); //after all the changes done which are setted above, we will display our todos
      })
  
      edit.addEventListener("click", (e) => {
        //if we click on this item...
        const input = content.querySelector("input"); //...the 'content' item
        input.removeAttribute("readonly"); //its readonly value will be removed
        input.focus(); //it highlights it ??
        input.addEventListener("blur", (e) => {
          //here it is setted, that if you click outside the input field, it will stop editing
          input.setAttribute("readonly", true); //if the readonly is true
          todo.content = e.target.value; //we set the new value of the 'content' (we rewrite the todo task)
          localStorage.setItem("todos", JSON.stringify(todos)); //it will be saved on localStorage
          DisplayTodos() //finally, the edited todo task will be displayed
        })
      })
  
      deleteButton.addEventListener("click", (e) => {
        todos = todos.filter((t) => t != todo); // ??
        localStorage.setItem("todos", JSON.stringify(todos)); //it will be saved on localStorage
        DisplayTodos()
      })
    })
  }
  