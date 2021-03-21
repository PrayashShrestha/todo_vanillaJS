const form = document.getElementById("form");
let input = document.getElementById("input");
let btn = document.getElementsByClassName("btn");
let list = document.querySelector(".todo_list");
const todo_item = document.querySelector(".todo_item");
const edit_btn = document.getElementsByClassName("edit-btn");
const del_btn = document.getElementsByClassName("del-btn");
let todo_list = [];

const edit = (event) => {
  event.preventDefault();
  lists = JSON.parse(localStorage.getItem("todos"));
  let editing_key = event.target.parentNode.getAttribute("data-key");
  if (editing_key) {
    lists.map((item) => {
      // map the list and match the data-key and edit
      if (item.id == editing_key) {
        input.value = item.name; //bringing the editing text to the input
        btn.value = "Update"; //changing the value of the button after clicking the edit button
        todo_list = lists.filter((item) => {
          return item.id != editing_key;
        });
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      localStorage.clear();
      todo_list = [
        ...todo_list,
        {
          id: Date.now(),
          name: input.value,
          completed: false,
        },
      ];
      addToLocalStorage();
      input.value = "";
    });
  }
};

const del = (event) => {
  event.preventDefault();
  localStorage.clear();
  populateUI();
};

const populateUI = () => {
  list.innerHTML = "";
  let lists = JSON.parse(localStorage.getItem("todos"));

  if (lists) {
    lists.forEach((list_item) => {
      //check if the ite is completed
      const checked = list_item.completed ? "checked" : null;
      //making li element and filling it <li></li>
      const li = document.createElement("li");
      li.setAttribute("class", "todo-item");
      li.setAttribute("data-key", list_item.id);
      if (list_item.completed === true) {
        li.classList.add("checked");
      }
      li.innerHTML = `
        <input type='checkbox' class="checkbox" ${checked}> 
        <span class="item">
        ${list_item.name}
        </span>
        <button class='edit-btn' onclick="edit(event)">
          Edit
        </button> 
        <button class='del-btn' onclick="del(event)">
          Delete
        </button> 
        
      `;
      //adding li to the <ul>
      list.append(li);
    });
  }
};

const addToLocalStorage = () => {
  //convert the array to the string and then store it
  localStorage.setItem("todos", JSON.stringify(todo_list));
  //render the list to the screen
  populateUI();
};

const addTodo = (inp) => {
  if (inp.value.trim() === "") {
    console.log("Error");
  } else {
    todo_list = JSON.parse(localStorage.getItem("todos"));
    inp.value = inp.value.trim();
    if (todo_list) {
      todo_list = [
        ...todo_list,
        {
          id: Date.now(),
          name: input.value,
          completed: false,
        },
      ];
    } else {
      todo_list = [
        {
          id: Date.now(),
          name: input.value,
          completed: false,
        },
      ];
    }
    addToLocalStorage();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo(input);
  input.value = "";
});

//main function to render in UI
populateUI();
