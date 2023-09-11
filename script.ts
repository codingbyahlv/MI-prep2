let todos = [
  { id: 1, title: "Title1", content: "Lorem Ipsum", done: false },
  { id: 2, title: "Title2", content: "Lorem Ipsum", done: false },
  { id: 3, title: "Title3", content: "Lorem Ipsum", done: true },
  { id: 4, title: "Title4", content: "Lorem Ipsum", done: false },
  { id: 5, title: "Title5", content: "Lorem Ipsum", done: false },
  { id: 6, title: "Title6", content: "Lorem Ipsum", done: true },
];

interface Todo {
  id: number;
  title: string;
  content: string;
  done: boolean;
}
// const todos = Todo[] = [];
let id = todos.length + 1;
const form = document.querySelector("form")!;
const newTitle = document.querySelector("#title") as HTMLInputElement;
const newContent = document.querySelector("#content") as HTMLInputElement;

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  createTodo(newTitle.value, newContent.value);
  form.reset();
  clearList();
  displayTodos();
});

const createTodo = (title: string, content: string) => {
  const newTodo: Todo = {
    id: id++,
    title: title,
    content: content,
    done: false,
  };
  todos.push(newTodo);
};

const removeTodo = (id: number) => {
  todos = todos.filter((obj) => obj.id !== id);
  clearList();
  displayTodos();
};

const updateTodo = (id: number, done: boolean) => {
  todos.map((todo) => {
    if (todo.id === id) {
      todo.done = done;
    }
  });
  clearList();
  displayTodos();
};

const clearList = () => {
  const notDoneTodosWrapper = document.querySelector("#notDoneTodosWrapper")!;
  const doneTodosWrapper = document.querySelector("#doneTodosWrapper")!;
  notDoneTodosWrapper.innerHTML = "";
  doneTodosWrapper.innerHTML = "";
};

const displayTodos = () => {
  todos.forEach((todo) => {
    const notDoneTodosWrapper = document.querySelector("#notDoneTodosWrapper")!;
    const doneTodosWrapper = document.querySelector("#doneTodosWrapper")!;

    const card = document.createElement("article");
    const title = document.createElement("h2");
    const content = document.createElement("p");
    const checkbox = document.createElement("input");
    const icon = document.createElement("i");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    icon.classList.add("fa-regular", "fa-trash-can");

    if (!todo.done) {
      card.classList.add("todoCard");
    } else {
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
    } else {
      doneTodosWrapper.appendChild(card);
    }

    checkbox.addEventListener("change", (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        let isChecked = e.target.checked;
        updateTodo(todo.id, isChecked);
      }
    });
    icon.addEventListener("click", (e: Event) => {
      removeTodo(todo.id);
    });
  });

  addHoverStyling();
};

const addHoverStyling = () => {
  const card = document.querySelectorAll(".todoCard")!;

  card.forEach((card) =>
    card.addEventListener("mouseenter", () => {
      card.classList.add("hovered-card");
    })
  );

  card.forEach((card) =>
    card.addEventListener("mouseleave", () => {
      card.classList.remove("hovered-card");
    })
  );
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
