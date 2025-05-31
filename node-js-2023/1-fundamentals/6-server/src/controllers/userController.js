import * as userService from "../services/userService.js";

export const listUsers = (req, res) => {
  const { search } = req.query;
  const users = userService.list(search);
  res.end(JSON.stringify(users));
};

export const createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.writeHead(400);
    return res.end(JSON.stringify({ error: "name and email are required" }));
  }

  const user = userService.create({ name, email });

  res.writeHead(201);
  return res.end(JSON.stringify(user));
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const success = userService.update(id, { name, email });
  if (!success) {
    res.writeHead(404);
    return res.end(JSON.stringify({ error: "User not found" }));
  }

  return res.writeHead(204).end();
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  const success = userService.remove(id);
  if (!success) {
    res.writeHead(404);
    return res.end(JSON.stringify({ error: "User not found" }));
  }

  return res.writeHead(204).end();
};
