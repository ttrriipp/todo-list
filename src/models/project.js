import TodoList from "./todo-list";

export default class Project {
  constructor(name, id) {
    this.id = id;
    this.name = name;
    this.todoList = new TodoList();
  }

  rename(newName) {
    this.name = newName;
  }
}
