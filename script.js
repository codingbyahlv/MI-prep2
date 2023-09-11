var todos = [
    { id: 1, title: "Title1", content: "Lorem Ipsum", done: false },
    { id: 2, title: "Title2", content: "Lorem Ipsum", done: false },
    { id: 3, title: "Title3", content: "Lorem Ipsum", done: true },
    { id: 4, title: "Title4", content: "Lorem Ipsum", done: false },
    { id: 5, title: "Title5", content: "Lorem Ipsum", done: false },
    { id: 6, title: "Title6", content: "Lorem Ipsum", done: true },
];
// const todos = Todo[] = [];
var id = todos.length + 1;
var form = document.querySelector("form");
var newTitle = document.querySelector("#title");
var newContent = document.querySelector("#content");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    createTodo(newTitle.value, newContent.value);
    form.reset();
    clearList();
    displayTodos();
});
var createTodo = function (title, content) {
    var newTodo = {
        id: id++,
        title: title,
        content: content,
        done: false,
    };
    todos.push(newTodo);
};
var removeTodo = function (id) {
    todos = todos.filter(function (obj) { return obj.id !== id; });
    clearList();
    displayTodos();
};
var updateTodo = function (id, done) {
    todos.map(function (todo) {
        if (todo.id === id) {
            todo.done = done;
        }
    });
    clearList();
    displayTodos();
};
var clearList = function () {
    var notDoneTodosWrapper = document.querySelector("#notDoneTodosWrapper");
    var doneTodosWrapper = document.querySelector("#doneTodosWrapper");
    notDoneTodosWrapper.innerHTML = "";
    doneTodosWrapper.innerHTML = "";
};
var displayTodos = function () {
    todos.forEach(function (todo) {
        var notDoneTodosWrapper = document.querySelector("#notDoneTodosWrapper");
        var doneTodosWrapper = document.querySelector("#doneTodosWrapper");
        var card = document.createElement("article");
        var title = document.createElement("h2");
        var content = document.createElement("p");
        var checkbox = document.createElement("input");
        var icon = document.createElement("i");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        icon.classList.add("fa-regular", "fa-trash-can");
        if (!todo.done) {
            card.classList.add("todoCard");
        }
        else {
            card.classList.add("todoCard", "todoDone");
        }
        title.textContent = "ID: " + todo.id + " " + todo.title;
        content.textContent = todo.content;
        checkbox.checked = todo.done;
        card.appendChild(title);
        card.appendChild(content);
        card.appendChild(checkbox);
        card.appendChild(icon);
        if (!todo.done) {
            notDoneTodosWrapper.appendChild(card);
        }
        else {
            doneTodosWrapper.appendChild(card);
        }
        checkbox.addEventListener("change", function (e) {
            if (e.target instanceof HTMLInputElement) {
                var isChecked = e.target.checked;
                updateTodo(todo.id, isChecked);
            }
        });
        icon.addEventListener("click", function (e) {
            removeTodo(todo.id);
        });
    });
    addHoverStyling();
};
var addHoverStyling = function () {
    var card = document.querySelectorAll(".todoCard");
    card.forEach(function (card) {
        return card.addEventListener("mouseenter", function () {
            card.classList.add("hovered-card");
        });
    });
    card.forEach(function (card) {
        return card.addEventListener("mouseleave", function () {
            card.classList.remove("hovered-card");
        });
    });
};
displayTodos();
// const anchor = document.querySelector("a")!;
// console.log(anchor.href);
// const pTag = document.querySelector(".pTag") as HTMLParagraphElement;
// pTag.addEventListener("mouseover", () => {
//   console.log("mouseover");
// });
// const form = document.querySelector("form")!;
// const input = document.querySelector("#color") as HTMLInputElement;
// form.addEventListener("submit", (e: Event) => {
//   e.preventDefault();
//   console.log(input.value);
//   pTag.style.color = input.value;
// });
