import Project from "./project";
import TodoItem from "./todo-item";

function loadProjectList() {
  let projectList = [];
  // check if it's opened for the first time
  if (!localStorage.getItem("projectList")) {
    projectList[0] = new Project("all tasks");
    projectList[0].addTask("task 1", "please", "2069-04-01", "high");
    projectList[0].addTask("task 2", "help", "2069-01-02", "high");
    projectList[0].addTask("task 3", "me", "2069-03-02", "high");
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

  return projectList;
}

export default (function Controller() {
  const projectList = loadProjectList();

  const saveData = () => {
    localStorage.setItem("projectList", JSON.stringify(projectList));
  };

  const createProject = (name) => {
    const newProject = new Project(name);
    getProjectList().push(newProject);
    saveData();
  };

  const getProject = (id) => {
    const project = getProjectList().find((project) => project.id === id);
    return project;
  };

  const getProjectTodoItem = (project, todoId) => {
    const projectTasklist = project.taskList;
    const todoItem = projectTasklist.find((item) => item.id === todoId);
    return todoItem;
  };

  const removeProject = (id) => {
    const project = getProjectList().find((project) => project.id === id);
    const projectIndex = getProjectList().indexOf(project);
    getProjectList().splice(projectIndex);
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
  };
})();
