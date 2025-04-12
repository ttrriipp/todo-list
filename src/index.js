import "./styles.css";
import Controller from "./controller";
import { displayProjects, displayProjectTodo } from "./display-controller";

displayProjects();
displayProjectTodo(Controller.getProjectList()[0].id);
