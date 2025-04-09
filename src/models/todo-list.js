import TodoItem from "./todo-item";

export default class TodoList {
  constructor() {
    this.list = [];
  }

  addItem(title, description, dueDate, priorityLevel) {
    const newItem = new TodoItem(title, description, dueDate, priorityLevel);
    this.list.push(newItem);
  }

  deleteItem(id) {
    const itemIndex = this.list.indexOf({ id: id });
    this.list.splice(itemIndex);
  }
}
