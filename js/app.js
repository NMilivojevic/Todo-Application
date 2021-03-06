(function () {
  const TODOController = {
    todoList: [],
    addTodo: function (tekst, status, id) {
      this.todoList.push({
        id: id,
        tekst: tekst,
        status: status,
      });

      UIController.displayTodo();
    },

    leftTodos: function () {
      const leftTodos = this.todoList.filter((todo) => {
        return !todo.status;
      });

      const numOfItems = leftTodos.length;

      if (numOfItems < 0) {
        numOfItems = 0;
      }

      const count = document.querySelector(UIController.domEle.count);
      count.textContent = `${numOfItems} item${
        numOfItems == 1 ? "" : "s"
      } left`;
    },

    updateStatus: function (status, element) {
      const id = element.id;
      TODOController.todoList.forEach((todo, index) => {
        if (id == todo.id) {
          todo.status = status;
        }
      });
    },

    getAll: function () {
      return this.todoList;
    },

    getActive: function () {
      return this.todoList.filter((todo) => !todo.status);
    },

    // getActive: function () {
    //   return this.todoList.filter((todo) => {
    //     return !todo.status;
    //   });
    // },

    getCompleted: function () {
      return this.todoList.filter((todo) => todo.status);
    },
  };

  const UIController = {
    domEle: {
      input: "#todo",
      list: ".todo-list",
      form: "#form",
      count: ".count",
      checkbox: 'input[type="checkbox"]',
      delete: ".custom-cross",
      clearCompleted: ".clear-completed",
      filterAll: "#all",
      filterActive: "#active",
      filterCompleted: "#completed",
    },

    getInput: function () {
      return document.querySelector(this.domEle.input).value;
    },

    addTodoToList: function (data) {
      // prikazivanje u listi tj renderovanje
      let markUp;
      markUp = `
        <li class="todo" draggable="true" id="${data.id}">
          <label>
            <input type="checkbox" name="light" ${data.status ? "checked" : ""}>
            <span class="custom-checkbox">
              <img src="./images/icon-check.svg" alt="checkmark">
            </span>
          </label>
          <span class="todo-text">${data.tekst}</span>
          <span class="custom-cross">
            <img src="./images/icon-cross.svg" alt="icon delete">
          </span>
        </li>
        `;

      document
        .querySelector(this.domEle.list)
        .insertAdjacentHTML("beforeend", markUp);
      TODOController.leftTodos();
      MainController.setCheckboxEvent();
    },

    displayTodo: function () {
      const todos = TODOController.todoList;
      document.querySelector(this.domEle.list).innerHTML = "";
      todos.forEach((todo, index) => {
        this.addTodoToList(todo);
      });
    },

    displayFilter: function (todos) {
      document.querySelector(this.domEle.list).innerHTML = "";
      todos.forEach((todo, index) => {
        this.addTodoToList(todo);
      });
    },
  };

  const MainController = {
    setAllEvents: function () {
      // dogadjaj unos u input polje
      document
        .querySelector(UIController.domEle.input)
        .addEventListener("keypress", function (e) {
          if (e.keyCode == 13) {
            const id = TODOController.todoList.length + 1;
            TODOController.addTodo(UIController.getInput(), false, id);
            document.querySelector(UIController.domEle.input).value = "";
          }
        });

      // submitovanje forme
      document
        .querySelector(UIController.domEle.form)
        .addEventListener("submit", function (e) {
          e.preventDefault();
        });

      // clear all completed
      document
        .querySelector(UIController.domEle.clearCompleted)
        .addEventListener("click", function () {
          const completed = TODOController.todoList.filter((todo) => {
            return todo.status;
          });

          if (completed.length <= 0) return;

          completed.forEach((completed) => {
            const index = TODOController.todoList.indexOf(completed);
            TODOController.todoList.splice(index, 1);
          });
          UIController.displayTodo();
        });

      // filter all
      document
        .querySelector(UIController.domEle.filterAll)
        .addEventListener("click", function () {
          const filterTodos = TODOController.getAll();
          UIController.displayFilter(filterTodos);
          document.querySelector(UIController.domEle.count).textContent =
          filterTodos.length <= 1
              ? `${filterTodos.length} item left`
              : `${filterTodos.length} items left`;
        });

      // filter active
      document
        .querySelector(UIController.domEle.filterActive)
        .addEventListener("click", function () {
          const filterTodos = TODOController.getActive();
          if (filterTodos.length <= 0) return;
          UIController.displayFilter(filterTodos);
          document.querySelector(UIController.domEle.count).textContent =
            filterTodos.length <= 1
              ? `${filterTodos.length} item left`
              : `${filterTodos.length} items left`;
        });

      // filter completed
      document
        .querySelector(UIController.domEle.filterCompleted)
        .addEventListener("click", function () {
          const filterTodos = TODOController.getCompleted();
          if (filterTodos.length <= 0) return;
          UIController.displayFilter(filterTodos);
          document.querySelector(UIController.domEle.count).textContent =
            filterTodos.length <= 1
              ? `${filterTodos.length} item completed`
              : `${filterTodos.length} items completed`;
        });

      MainController.setCheckboxEvent();
    },

    setCheckboxEvent: function () {
      // kada se cekira task iz liste
      document
        .querySelectorAll(UIController.domEle.checkbox)
        .forEach((checkbox) => {
          checkbox.addEventListener("click", function (e) {
            const todoElement = e.target.closest("li");
            if (e.target.checked) {
              TODOController.updateStatus(true, todoElement);
            } else {
              TODOController.updateStatus(false, todoElement);
            }

            TODOController.leftTodos();
          });
        });

      // za brisanje taskova
      document.querySelectorAll(UIController.domEle.delete).forEach((cross) => {
        cross.addEventListener("click", function (e) {
          const id = e.target.closest("li").id;

          const matches = TODOController.todoList.filter((todo) => {
            return todo.id == id;
          })[0];
          const index = TODOController.todoList.indexOf(matches);
          if (index < 0) return;
          TODOController.todoList.splice(index, 1);
          UIController.displayTodo();
          TODOController.leftTodos();
        });
      });
    },
  };

  window.addEventListener("load", function () {
    MainController.setAllEvents();

    // Adds draggable functionality with animated swapping
    new Sortable(document.querySelector(UIController.domEle.list), {
      animation: 350,
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag"
    });
  });
})();
