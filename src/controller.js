import Project from "./project";

export default (function Controller() {
  let projectList = [];
  if (!localStorage.getItem("projectList")) {
    localStorage.setItem("projectList", JSON.stringify(projectList));
  } else {
    projectList = JSON.parse(localStorage.getItem("projectList")).map((p) =>
      Object.assign(new Project(p.name), p)
    );
    if (projectList.length === 0) {
      projectList = [new Project("all tasks")];
      projectList[0].addTask("task 1", "please", "2069-04-01", "high");
      projectList[0].addTask("task 2", "help", "2069-01-02", "high");
      projectList[0].addTask("task 3", "me", "2069-03-02", "high");
    }
  }
  const createProject = (name) => {
    const newProject = new Project(name);
    projectList.push(newProject);
  };

  const getProject = (id) => {
    const project = projectList.find((project) => project.id === id);
    return project;
  };

  const getProjectTodoItem = (project, todoId) => {
    const todoItem = project.taskList.find((item) => (item.id = todoId));
    return todoItem;
  };

  const saveData = () => {
    localStorage.setItem("projectList", JSON.stringify(projectList));
  };

  const getProjectList = () => projectList;

  return {
    createProject,
    getProject,
    getProjectTodoItem,
    getProjectList,
    saveData,
  };
})();
