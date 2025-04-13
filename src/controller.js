import Project from "./project";
import TodoItem from "./todo-item";

export default (function Controller() {
  let projectList = [new Project("all tasks")];
  if (!localStorage.getItem("projectList")) {
    localStorage.setItem("projectList", JSON.stringify(projectList));
  } else {
    projectList = JSON.parse(localStorage.getItem("projectList")).map((p) =>
      Object.assign(new Project(p.name), p)
    );

    projectList.forEach((project) => {
      project.taskList = project.taskList.map((task) =>
        Object.assign(new TodoItem(), task)
      );
    });
  }

  if (projectList[0].taskList.length < 3) {
    projectList[0].addTask("task 1", "please", "2069-04-01", "high");
    projectList[0].addTask("task 2", "help", "2069-01-02", "high");
    projectList[0].addTask("task 3", "me", "2069-03-02", "high");
  }
  const createProject = (name) => {
    const newProject = new Project(name);
    projectList.push(newProject);
  };

  const addTaskToAllTask = (
    taskTitle,
    taskDescription,
    taskDueDate,
    taskPriorityLevel
  ) => {
    projectList[0].addTask(
      taskTitle,
      taskDescription,
      taskDueDate,
      taskPriorityLevel
    );
  };

  const removeAllTaskFromAllTask = (projectTaskList) => {
    for (let task of projectList[0].taskList) {
      for (let x of projectTaskList) {
        if (x.id === task.id) {
          const taskIndex = projectList[0].taskList.indexOf(task);
          projectList[0].taskList.splice(taskIndex);
        }
      }
    }
  };

  const getProject = (id) => {
    const project = projectList.find((project) => project.id === id);
    return project;
  };

  const getProjectTodoItem = (project, todoId) => {
    const todoItem = project.taskList.find(
      (item) => item.id === Number(todoId)
    );
    return todoItem;
  };

  const saveData = () => {
    localStorage.setItem("projectList", JSON.stringify(projectList));
  };

  const removeProject = (id) => {
    projectList = JSON.parse(localStorage.getItem("projectList")).map((p) =>
      Object.assign(new Project(p.name), p)
    );
    const project = projectList.find((project) => project.id === id);
    const projectIndex = projectList.indexOf(project);
    removeAllTaskFromAllTask(project.taskList);
    projectList.splice(projectIndex);
    saveData();
  };

  const getProjectList = () => projectList;

  return {
    createProject,
    getProject,
    getProjectTodoItem,
    getProjectList,
    saveData,
    removeProject,
    addTaskToAllTask,
  };
})();
