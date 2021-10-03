(function () {

  const TODOController = {

      addItemToList: function () {
        
      }
  }

// UI CONTROLLER
  const UIController = {

    domEle: {
      input: "#todo",
      list: ".todo-list",
    },


  };

  const MainController = {
    setAllEvents: function () {
      document
        .querySelector(UIController.domEle.input)
        .addEventListener("keypress", function (e) {
          console.log(e);
        });
    }
  }

  window.addEventListener('load', function () {
    MainController.setAllEvents();
  })



})();
