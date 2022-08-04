const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;

  if (inputAdd.value == "") {
    alert("Todo cannot be empty");
  } else {
    addTodo(inputAdd.value, false);
  }

  inputAdd.value = "";

  saveTodo();
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";

  //your code here
  div.appendChild(span);
  div.appendChild(doneBtn);
  div.appendChild(deleteBtn);
  todoCtn.prepend(div);

  //append todo to HTML...
  //define buttons event...

  doneBtn.style.display = "none";
  deleteBtn.style.display = "none";

  doneBtn.onclick = () => {
    if (completed == true) {
      span.style.textDecoration = "";
      completed = false;
    } else {
      span.style.textDecoration = "line-through";
      completed = true;
    }

    saveTodo();
  };

  deleteBtn.onclick = () => {
    todoCtn.removeChild(div);
    saveTodo();
  };

  div.onmouseover = () => {
    doneBtn.style.display = "";
    deleteBtn.style.display = "";
  };

  div.onmouseout = () => {
    doneBtn.style.display = "none";
    deleteBtn.style.display = "none";
  };
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    //your code here
    const todoObj = {};
    todoObj.title = todoDiv.children[0].innerText;
    todoObj.completed =
      todoDiv.children[0].style.textDecoration === "line-through";
    data.unshift(todoObj);
  }
  //your code here
  const dataStr = JSON.stringify(data);
  localStorage.setItem("todoListData", dataStr);
}

function loadTodo() {
  //your code here
  const dataStr = localStorage.getItem("todoListData");
  const data = JSON.parse(dataStr);

  for (const todoObj of data) {
    addTodo(todoObj.title, todoObj.completed);
  }
}

loadTodo();
