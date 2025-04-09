import Project from "./project";

class ProjectList {
  constructor() {
    this.list = [];
  }

  newProject(name) {
    const projectId = crypto.randomUUID();
    const newProject = new Project(name, projectId);
    this.list.push(newProject);
  }

  deleteProject(id) {
    const projectIndex = this.list.indexOf({ id: id });
    this.list.splice(projectIndex);
  }
}
