export default class TodoItem {
  constructor(title, description, dueDate, priorityLevel) {
    this.title = title;
    this.description = description;
    this.dueDate = "due date: " + dueDate;
    this.priorityLevel = priorityLevel;
    this.completed = false;
    this.id = crypto.randomUUID();
  }

  toggleStatus() {
    this.completed = !this.completed;
  }
}
