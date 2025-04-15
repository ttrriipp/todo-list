import Controller from "./controller";

export default function DisplayController() {
  let currentProjectId = Controller.getProjectList()[0].id;

  (function InitProjectSection() {
    const projectSection = document.querySelector(".project-section");
    const projectTitle = document.querySelector(".project-title");
    projectSection.addEventListener("click", selectProject);

    function selectProject(e) {
      const selectedProjectId = e.target.dataset.id;
      if (!selectedProjectId) {
        return;
      }

      currentProjectId = selectedProjectId;
      displayProjectTodo(selectedProjectId);
      projectTitle.textContent = Controller.getProject(selectedProjectId).name;
    }
  })();

  function displayProjects() {
    const projectSection = document.querySelector(".project-section");
    projectSection.textContent = "";
    Controller.getProjectList().forEach((project) => {
      createProjectTab(project);
    });
  }

  function displayProjectTodo(projectId) {
    const allTaskProject = Controller.getProjectList()[0];
    const taskSection = document.querySelector(".task-section");
    const project = Controller.getProject(projectId);
    const todoList = project.taskList;
    const projectList = Controller.getProjectList();
    displayRemoveButton();

    if (projectId === allTaskProject.id) {
      taskSection.textContent = "";
      projectList.forEach((project) => {
        project.taskList.forEach((task) => {
          createTodoItem(task);
        });
      });
    } else {
      taskSection.textContent = "";
      todoList.forEach((item) => {
        createTodoItem(item);
      });
    }
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
    todoItem.dataset.completed = item.completed;

    //loop through each tasks to find the project that has that task
    let projectId;
    Controller.getProjectList().forEach((project) => {
      project.taskList.forEach((task) => {
        if (item.id === task.id) {
          projectId = project.id;
        }
      });
    });
    todoItem.dataset.projectId = projectId;

    todoItem.classList.add("task-card");

    todoItem.appendChild(checkBox);
    todoItem.appendChild(todoTitle);
    todoItem.appendChild(description);
    todoItem.appendChild(dueDate);

    taskSection.appendChild(todoItem);
  }

  (function InitCreateProjectForm() {
    const openDialogButton = document.querySelector(".create-project-button");
    const createProjectDialog = document.querySelector(
      ".create-project-dialog"
    );
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
            Controller.createProject(projectName.value);
            createProjectDialog.close();
            displayProjects();
          }
          break;
      }
    });
  })();

  (function InitAddTaskDialog() {
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
            Controller.getProject(currentProjectId).addTask(
              taskTitle.value,
              taskDescription.value,
              taskDueDate.value,
              taskPriorityLevel.value
            );
            displayProjectTodo(currentProjectId);
          }
      }
    });
  })();

  function displayRemoveButton() {
    const allTaskProject = Controller.getProjectList()[0];
    if (currentProjectId === allTaskProject.id) {
      const projectHeaderButtonContainer = document.querySelector(
        ".project-header .button-container"
      );
      projectHeaderButtonContainer.textContent = "";
    } else {
      const projectHeaderButtonContainer = document.querySelector(
        ".project-header .button-container"
      );
      const deleteProjectButton = document.createElement("button");
      deleteProjectButton.classList.add("delete-project-button");
      deleteProjectButton.textContent = "delete project";

      projectHeaderButtonContainer.textContent = "";

      projectHeaderButtonContainer.appendChild(deleteProjectButton);
      deleteProjectButton.addEventListener("click", deleteProject);
    }

    function deleteProject(e) {
      Controller.removeProject(currentProjectId);
      currentProjectId = Controller.getProjectList()[0].id;
      displayProjects();
      displayProjectTodo(currentProjectId);
    }
  }

  (function toggleTaskStatusFunctionality() {
    const taskSection = document.querySelector(".task-section");
    taskSection.addEventListener("click", (event) => {
      const button = event.target.closest(".task-card");
      if (!button) return;
      toggleTaskStatus(button);
    });

    const toggleTaskStatus = function (button) {
      const project = Controller.getProject(button.dataset.projectId);
      const task = Controller.getProjectTodoItem(project, button.dataset.id);
      task.toggleStatus();
      button.dataset.completed = task.completed;

      const checkbox = button.querySelector("input[type='checkbox']");
      if (checkbox) {
        checkbox.checked = task.completed;
      }
      displayProjectTodo(currentProjectId);
      Controller.saveData();
    };
  })();

  displayProjects();
  displayProjectTodo(currentProjectId);
}
