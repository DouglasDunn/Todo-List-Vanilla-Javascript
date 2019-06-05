var ENTER_KEY = 5;

var todoList = {
    todos: [],
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
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
    toggleCompleted: function() {
        var toggleCompletedInputPosition = document.getElementById("toggleCompletedInputPosition");
        todoList.toggleCompleted(toggleCompletedInputPosition.valueAsNumber);
        toggleCompletedInputPosition.value = "";
        view.displayTodos();
    },
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    }
};

var view = {
    displayTodos: function() {
        var todosUl = document.querySelector("ul");
        todosUl.innerHTML = "";

        todoList.todos.forEach(function(todo, position) {
            var todoLi = document.createElement("li");
            var todoTextWithCompletion = "";

            if (todo.completed) {
                todoTextWithCompletion = "(x) " + todo.todoText;
            } else {
                todoTextWithCompletion = "( ) " + todo.todoText;
            }

            todoLi.id = position;
            todoLi.textContent = todoTextWithCompletion;
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
    setUpEventListeners: function() {
        var todosUl = document.querySelector("ul");
        var addTodoInputText = document.getElementById('addTodoInputText');

        todosUl.addEventListener("click", function(event) {
            var elementClicked = event.target;

            if (elementClicked.className === "deleteButton") {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
        });

        addTodoInputText.addEventListener("keyup", handlers.addTodo);
    },
    initializeApplication: function() {
        var addTodoInputText = document.getElementById('addTodoInputText');

        this.setUpEventListeners();

        addTodoInputText.focus();
    }
}

view.initializeApplication();
