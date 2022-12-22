let todoItemsContainer = document.getElementById("todoItemsContainer");

let saveItem = document.getElementById("saveItem");
saveItem.onclick = function () {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

function todoGet() {
  let stringifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifiedTodoList);
  if (parsedTodoList === null) {
    return [];
  } else {
    return parsedTodoList;
  }
}

let todoList = todoGet();

let todoCount = todoList.length;

function todoStatus(labelID, todoID) {
  //   if (inputElement.checked) {
  //     labelElement.classList.add("checked");
  //   } else if (!inputElement.checked) {
  //     labelElement.classList.remove("checked");
  //   }

  let labelElement = document.getElementById(labelID);
  labelElement.classList.toggle("checked");

  let checkedItemIndex = todoList.findIndex(function (eachTodo) {
    let eachTodoID = "todo" + eachTodo.uniqueID;
    if (eachTodoID === todoID) {
      return true;
    } else {
      return false;
    }
  });

  let checkedObject = todoList[checkedItemIndex];

  if (checkedObject.isChecked === true) {
    checkedObject.isChecked = false;
  } else {
    checkedObject.isChecked = true;
  }
}

function todoDelete(todoID) {
  let todoElement = document.getElementById(todoID);
  todoItemsContainer.removeChild(todoElement);

  let deletedItemIndex = todoList.findIndex(function (eachTodo) {
    let eachTodoID = "todo" + eachTodo.uniqueID;
    if (eachTodoID === todoID) {
      return true;
    } else {
      return false;
    }
  });

  todoList.splice(deletedItemIndex, 1);
}

function createTodoItem(todo) {
  let todoText = todo.text;
  let checkboxID = "checkbox" + todo.uniqueID;
  let labelID = "label" + todo.uniqueID;
  let todoID = "todo" + todo.uniqueID;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id = todoID;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxID;
  inputElement.checked = todo.isChecked;
  inputElement.classList.add("checkbox-input", "shadow-sm");

  inputElement.onclick = function () {
    todoStatus(labelID, todoID);
  };

  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add(
    "label-container",
    "shadow-sm",
    "d-flex",
    "flex-row"
  );
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxID);
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todoText;
  labelElement.id = labelID;

  if (todo.isChecked === true) {
    labelElement.classList.add("checked");
  }

  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("span");
  deleteIcon.classList.add("material-symbols-outlined", "delete-icon");
  deleteIcon.textContent = "delete";

  deleteIcon.onclick = function () {
    todoDelete(todoID);
  };

  deleteIconContainer.appendChild(deleteIcon);
}

for (todo of todoList) {
  createTodoItem(todo);
}

function todoAdd() {
  let userInput = document.getElementById("todoUserInput");
  let userInputValue = userInput.value;

  if (userInputValue === "") {
    alert("Please enter a valid input.");
    return;
  }

  todoCount += 1;

  let todoNew = {
    text: userInputValue,
    uniqueID: todoCount,
    isChecked: false,
  };
  todoList.push(todoNew);

  createTodoItem(todoNew);
  userInput.value = "";
}

let addItem = document.getElementById("addItem");
addItem.onclick = function () {
  todoAdd();
};
