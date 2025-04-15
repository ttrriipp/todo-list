import TodoItem from "./todo-item";

export default class Project {
  constructor(name) {
    this.name = name;
    this.id = crypto.randomUUID();
    this.taskList = [];
  }

  addTask(title, description, dueDate, priorityLevel) {
    const newTask = new TodoItem(title, description, dueDate, priorityLevel);
    this.taskList.push(newTask);
  }

  removeTask(id) {
    const task = this.taskList.find((item) => item.id === id);
    const taskIndex = this.taskList.indexOf(task);
    this.taskList.splice(taskIndex, 1);
  }
}
