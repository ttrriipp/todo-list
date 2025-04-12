import controller from "./controller";

let currentProjectId;
if (controller.getProjectList()) {
  currentProjectId = controller.getProjectList()[0].id;
}
(function selectProject() {
  const projectSection = document.querySelector(".project-section");
  const projectTitle = document.querySelector(".project-title");
  projectSection.addEventListener("click", (event) => {
    if (!event.target.dataset.id) {
      return;
    }
    displayProjectTodo(event.target.dataset.id);
    projectTitle.textContent = controller.getProject(
      event.target.dataset.id
    ).name;
    currentProjectId = event.target.dataset.id;
  });
})();

export function displayProjects() {
  const projectSection = document.querySelector(".project-section");
  projectSection.textContent = "";
  controller.getProjectList().forEach((project) => {
    createProjectTab(project);
  });
}

export function displayProjectTodo(projectId) {
  if (controller.getProject(projectId) == controller.getProjectList()[0]) {
    const taskSection = document.querySelector(".task-section");
    taskSection.textContent = "";
    controller.getProjectList().forEach((project) => {
      project.taskList.forEach((item) => {
        createTodoItem(item);
      });
    });
    return;
  }
  const todoList = controller.getProject(projectId).taskList;
  const taskSection = document.querySelector(".task-section");
  taskSection.textContent = "";
  todoList.forEach((item) => {
    createTodoItem(item);
  });
}

function createProjectTab(project) {
  const projectSection = document.querySelector(".project-section");
  const newProjectTab = document.createElement("button");
  newProjectTab.classList.add("project-tab");
  newProjectTab.textContent = project.name;
  newProjectTab.dataset.id = project.id;

  projectSection.appendChild(newProjectTab);
}

function createTodoItem(item) {
  const taskSection = document.querySelector(".task-section");

  const todoItem = document.createElement("button");
  const checkBox = document.createElement("input");
  const todoTitle = document.createElement("h4");
  const description = document.createElement("p");
  const dueDate = document.createElement("span");

  todoTitle.classList.add("title");
  description.classList.add("description");
  dueDate.classList.add("due-date");

  todoTitle.textContent = item.title;
  description.textContent = item.description;
  dueDate.textContent = item.dueDate;
  checkBox.type = "checkbox";
  checkBox.checked = item.completed;
  todoItem.dataset.priorityLevel = item.priorityLevel;
  todoItem.dataset.id = item.id;
  checkBox.dataset.id = item.id;
  todoItem.dataset.completed = item.completed;

  todoItem.classList.add("task-card");

  todoItem.appendChild(checkBox);
  todoItem.appendChild(todoTitle);
  todoItem.appendChild(description);
  todoItem.appendChild(dueDate);

  taskSection.appendChild(todoItem);
}

(function CreateProjectForm() {
  const openDialogButton = document.querySelector(".create-project-button");
  const createProjectDialog = document.querySelector(".create-project-dialog");
  const createProjectForm = document.querySelector("#create-project-form");
  const projectName = document.querySelector("#project-name");

  openDialogButton.addEventListener("click", () =>
    createProjectDialog.showModal()
  );

  createProjectForm.addEventListener("click", (event) => {
    switch (event.target.className) {
      case "cancel-button":
        event.preventDefault();
        createProjectDialog.close();
        break;
      case "create-button":
        if (projectName.validity.valid) {
          controller.createProject(projectName.value);
          createProjectDialog.close();
          displayProjects();
          controller.saveData();
        }
        break;
    }
  });
})();

(function AddTaskDialog() {
  const openDialogButton = document.querySelector(".add-task-button");
  const addTaskDialog = document.querySelector(".add-task-dialog");
  const addTaskForm = document.querySelector("#add-task-form");

  const taskTitle = document.querySelector("#title");
  const taskDescription = document.getElementById("description");
  const taskDueDate = document.getElementById("due-date");
  const taskPriorityLevel = document.getElementById("priority-level");

  openDialogButton.addEventListener("click", () => addTaskDialog.showModal());

  addTaskForm.addEventListener("click", (event) => {
    switch (event.target.className) {
      case "cancel-button":
        event.preventDefault();
        addTaskDialog.close();
        break;
      case "add-button":
        if (addTaskForm.checkValidity()) {
          controller
            .getProject(currentProjectId)
            .addTask(
              taskTitle.value,
              taskDescription.value,
              taskDueDate.value,
              taskPriorityLevel.value
            );
          displayProjectTodo(currentProjectId);
          controller.saveData();
        }
    }
  });
})();
