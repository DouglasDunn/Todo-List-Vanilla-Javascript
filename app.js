var ENTER_KEY = 5;

var todoList = {
    todos: [],
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });

        localStorage.setItem('todoList', JSON.stringify(this.todos));
    },
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;

        localStorage.setItem('todoList', JSON.stringify(this.todos));
    },
    toggleAll: function() {
        var completedTodos = 0;
        var totalTodos = this.todos.length;

        this.todos.forEach(function(todo) {
            if (todo.completed) {
                completedTodos++;
            }
        });

        this.todos.forEach(function(todo) {
            if (completedTodos === totalTodos) {
                todo.completed = false;
            } else {
                todo.completed = true;
            }
        });
    }
};

var handlers = {
    addTodo: function(e) {
        // get the text input
        var addTodoInputText = document.getElementById("addTodoInputText");

        // if enter was pressed and the input has a value, add text to the Todo List
        if (e.which === 13 && addTodoInputText.value !== "") {
            todoList.addTodo(addTodoInputText.value);
            addTodoInputText.value = "";
            view.displayTodos();
        }
    },
    changeTodo: function() {
        var changeTodoInputPosition = document.getElementById("changeTodoInputPosition");
        var changeTodoInputText = document.getElementById("changeTodoInputText");
        todoList.changeTodo(changeTodoInputPosition.valueAsNumber, changeTodoInputText.value);
        changeTodoInputText.value = "";
        changeTodoInputPosition.value = "";
        view.displayTodos();
    },
    deleteTodo: function(position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompleted: function(position) {
        // var toggleCompletedInputPosition = document.getElementById("toggleCompletedInputPosition");
        todoList.toggleCompleted(position);
        // toggleCompletedInputPosition.value = "";
        view.displayTodos();
    },
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    }
};

var view = {
    displayTodos: function() {
        var todoListView = document.getElementById('todoListView');
        var todosUl = document.querySelector("ul");

        if (todoList.todos.length !== 0) {
            todoListView.style.display = "block";
        } else {
            todoListView.style.display = "none";
        }

        todosUl.innerHTML = "";

        todoList.todos.forEach(function(todo, position) {
            var todoLi = document.createElement("li");
            var strike = document.createElement("strike");
            var label = document.createElement("label");

            todoLi.id = position;

            if (todo.completed) {
                strike.textContent = todo.todoText;
                label.appendChild(strike);
                todoLi.appendChild(label);
            } else {
                label.textContent = todo.todoText;
                todoLi.appendChild(label);
            }

            todoLi.prepend(this.createToggleButton(todo.completed));
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
        }, this);
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement("button");
        deleteButton.className = "deleteButton";
        deleteButton.textContent = "Delete";
        return deleteButton;
    },
    createToggleButton: function(completed) {
        var toggleButton = document.createElement("input");
        toggleButton.className = "toggleButton";
        toggleButton.type = "checkbox";

        if (completed) {
            toggleButton.setAttribute("checked", true);
        }

        return toggleButton;
    },
    setUpEventListeners: function() {
        var todosUl = document.querySelector("ul");
        var addTodoInputText = document.getElementById('addTodoInputText');

        todosUl.addEventListener("click", function(event) {
            var elementClicked = event.target;

            if (elementClicked.className === "deleteButton") {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            } else if (elementClicked.className === "toggleButton") {
                handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
            }
        });

        addTodoInputText.addEventListener("keyup", handlers.addTodo);
    },
    initializeApplication: function() {
        var addTodoInputText = document.getElementById('addTodoInputText');

        if (localStorage.getItem('todoList') === null) {
            localStorage.setItem('todoList', '[]');
        } else {
            todoList.todos = JSON.parse(localStorage.getItem('todoList'));
        }

        this.displayTodos();
        this.setUpEventListeners();
        addTodoInputText.focus();
    }
}

view.initializeApplication();
