(function () {
  const TODOController = {
    todoList: [],
    addTodo: function (tekst, status) {
      this.todoList.push({
        tekst: tekst,
        status: status,
      });

      UIController.displayTodo();
    },

    leftTodos: function () {
      const leftTodos = this.todoList.filter((todo) => {
        return !todo.status;
      });
      
      if(leftTodos.length < 0) return;
      
      const count = document.querySelector(UIController.domEle.count);
      count.textContent = `${leftTodos.length} items left`;
    },
  };

  const UIController = {
    domEle: {
      input: "#todo",
      list: ".todo-list",
      form: "#form",
      count: ".count",
    },

    getInput: function () {
      return document.querySelector(this.domEle.input).value;
    },

    addTodoToList: function (data) {
      // prikazivanje u listi tj renderovanje
      let markUp;
      markUp = `
        <li class="todo" draggable="true">
          <label>
            <input type="checkbox" name="light" ${data.status ? "checked" : ""}>
            <span class="custom-checkbox">
              <img src="./images/icon-check.svg" alt="checkmark">
            </span>
          </label>
          <span class="todo-text">${data.tekst}</span>
        </li>
        `;

      document
        .querySelector(this.domEle.list)
        .insertAdjacentHTML("beforeend", markUp);
      TODOController.leftTodos();
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
            TODOController.addTodo(UIController.getInput(), false);
          }
        });

      // submitovanje forme
      document
        .querySelector(UIController.domEle.form)
        .addEventListener("submit", function (e) {
          e.preventDefault();
        });
    },
  };

  window.addEventListener("load", function () {
    MainController.setAllEvents();
  });
})();
