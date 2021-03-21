const form = document.getElementById("form");
let input = document.getElementById("input");
let items = document.querySelector(".todo_items");
const todo_item = document.querySelector(".todo_item");
const edit_btn = document.getElementsByClassName("edit-btn");
const del_btn = document.getElementsByClassName("del-btn");

//adding the values after onClick
addTodo();
updateTodo();
editTodo();
deleteTodo();
checkedTodo();
addToLocalStorage();
