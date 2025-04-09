export default class TodoItem {
  constructor(title, description, dueDate, priorityLevel) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priorityLevel = priorityLevel;
    this.id = Date.now();
    this.complete = false;
  }

  toggleStatus() {
    this.complete = this.complete == false ? true : false;
  }

  rename(newName) {
    this.name = newName;
  }

  editDescription(newDescription) {
    this.description = newDescription;
  }

  changeDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }

  changePriorityLevel(newPriorityLevel) {
    this.priorityLevel = newPriorityLevel;
  }
}
