import Controller from "./controller";

export default function DisplayController() {
  let currentProjectId = Controller.getProjectList()[0].id;

  (function InitProjectSection() {
    const projectSection = document.querySelector(".project-section");
    projectSection.addEventListener("click", selectProject);

    function selectProject(e) {
      const selectedProjectId = e.target.dataset.id;
      if (!selectedProjectId) {
        return;
      }

      currentProjectId = selectedProjectId;
      displayProjectTodo(selectedProjectId);
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
    const projectTitle = document.querySelector(".project-title");
    const allTaskProject = Controller.getProjectList()[0];
    const taskSection = document.querySelector(".task-section");
    const project = Controller.getProject(projectId);
    const todoList = project.taskList;
    const projectList = Controller.getProjectList();
    projectTitle.textContent = Controller.getProject(projectId).name;

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

    const todoItemContainer = document.createElement("div");
    const todoItem = document.createElement("button");
    const checkBox = document.createElement("input");
    const todoTitle = document.createElement("h4");
    const description = document.createElement("p");
    const dueDate = document.createElement("span");
    const editButton = document.createElement("button");
    const removeButton = document.createElement("button");

    todoTitle.classList.add("title");
    todoTitle.textContent = item.title;
    description.classList.add("description");
    description.textContent = item.description;
    dueDate.classList.add("due-date");
    dueDate.textContent = "due date: " + item.dueDate;
    checkBox.type = "checkbox";
    checkBox.checked = item.completed;
    todoItem.dataset.priorityLevel = item.priorityLevel;
    todoItem.dataset.id = item.id;
    removeButton.dataset.id = item.id;
    editButton.dataset.id = item.id;
    todoItem.dataset.completed = item.completed;
    editButton.classList.add("edit-button");
    editButton.textContent = "edit";
    removeButton.classList.add("remove-button");
    removeButton.textContent = "remove";
    todoItemContainer.classList.add("task-card-container");

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
    removeButton.dataset.projectId = projectId;
    removeTaskFunctionality(removeButton);

    editButton.dataset.projectId = projectId;
    editTaskFunctionality(editButton);

    todoItem.classList.add("task-card");

    todoItem.appendChild(checkBox);
    todoItem.appendChild(todoTitle);
    todoItem.appendChild(description);
    todoItem.appendChild(dueDate);

    todoItemContainer.appendChild(todoItem);
    todoItemContainer.appendChild(editButton);
    todoItemContainer.appendChild(removeButton);
    taskSection.appendChild(todoItemContainer);
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

  function removeTaskFunctionality(button) {
    button.addEventListener("click", removeTask);

    function removeTask(e) {
      const task = e.target;
      const projectId = task.dataset.projectId;
      const taskId = task.dataset.id;
      console.log(Controller.getProjectList());
      const project = Controller.getProject(projectId);
      project.removeTask(taskId);
      Controller.saveData();
      displayProjectTodo(currentProjectId);
    }
  }

  function editTaskFunctionality(button) {
    button.addEventListener("click", openEditTaskDialog);
    const editTaskDialog = document.querySelector(".edit-task-dialog");
    const editTitle = document.getElementById("edit-title");
    const editDescription = document.getElementById("edit-description");
    const editDueDate = document.getElementById("edit-due-date");
    const editPriorityLevel = document.getElementById("edit-priority-level");

    function openEditTaskDialog(e) {
      const taskId = e.target.dataset.id;
      const projectId = e.target.dataset.projectId;
      const task = Controller.getProjectTodoItem(
        Controller.getProject(projectId),
        taskId
      );
      editTitle.value = task.title;
      editDescription.value = task.description;
      editDueDate.value = task.dueDate;
      editPriorityLevel.value = task.priorityLevel;

      editTaskDialog.showModal();

      const editTaskForm = document.querySelector("#edit-task-form");
      const cancelButton = editTaskForm.querySelector(".cancel-button");
      const editButton = editTaskForm.querySelector(".edit-button");

      cancelButton.addEventListener("click", (e) => {
        e.preventDefault();
        editTaskDialog.close();
      });

      editButton.addEventListener("click", editTaskDetails);

      function editTaskDetails() {
        task.title = editTitle.value;
        task.description = editDescription.value;
        task.dueDate = editDueDate.value;
        task.priorityLevel = editPriorityLevel.value;
        task.title = editTitle.value;
        Controller.saveData();
        displayProjectTodo(currentProjectId);
      }
    }
  }

  displayProjects();
  displayProjectTodo(currentProjectId);
}
