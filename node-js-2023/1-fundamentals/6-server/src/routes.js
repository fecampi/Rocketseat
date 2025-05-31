import { buildRoutePath } from "./utils/build-route-path.js";
import * as user from "./controllers/userController.js";
import * as task from "./controllers/taskController.js";

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: user.listUsers,
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: user.createUser,
  },
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    handler: user.updateUser,
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: user.deleteUser,
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: task.createTask,
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: task.listTasks,
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: task.updateTask,
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: task.deleteTask,
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: task.toggleCompleteTask,
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks/import"),
    handler: task.importTasks,
  },
];
