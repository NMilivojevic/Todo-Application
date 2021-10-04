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
  };

  const UIController = {
    domEle: {
      input: "#todo",
      list: ".todo-list",
      form: "#form",
      count: ".count",
      checkbox: 'input[type="checkbox"]',
      delete: ".custom-cross",
      clearCompleted: '.clear-completed'
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


    // brisanje svih all completed 
    document.querySelector(UIController.domEle.clearCompleted).addEventListener('click', function () {
      const completed = TODOController.todoList.filter(todo => {
        return todo.status;
      });
      completed.forEach(completed => {
        const index = TODOController.todoList.indexOf(completed);
        TODOController.todoList.splice(index, 1);
      });
      UIController.displayTodo();
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
  });
})();
