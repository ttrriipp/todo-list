export default class TodoItem {
  constructor(title, description, dueDate, priorityLevel) {
    this.title = title;
    this.description = description;
    this.dueDate = "due date: " + dueDate;
    this.priorityLevel = priorityLevel;
    this.completed = false;
    this.id = Date.now();
  }

  toggleStatus() {
    this.complete = this.completed == false ? true : false;
  }

  rename(newName) {
    this.title = newName;
  }

  changeDescription(newDescription) {
    this.description = newDescription;
  }

  changeDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }

  changePriorityLevel(newPriorityLevel) {
    this.priorityLevel = newPriorityLevel;
  }
}
