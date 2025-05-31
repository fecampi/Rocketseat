import * as taskService from "../services/taskService.js";

export const createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.writeHead(400);
    return res.end(
      JSON.stringify({ error: "title and description are required" })
    );
  }

  const task = taskService.create({ title, description });

  res.writeHead(201);
  res.end(JSON.stringify(task));
};

export const listTasks = (req, res) => {
  const { search } = req.query;
  const tasks = taskService.list(search);
  res.end(JSON.stringify(tasks));
};

export const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const success = taskService.update(id, { title, description });
  if (!success) {
    res.writeHead(404);
    return res.end(JSON.stringify({ error: "Task not found" }));
  }

  res.writeHead(204).end();
};

export const deleteTask = (req, res) => {
  const { id } = req.params;

  const success = taskService.remove(id);
  if (!success) {
    res.writeHead(404);
    return res.end(JSON.stringify({ error: "Task not found" }));
  }

  res.writeHead(204).end();
};

export const toggleCompleteTask = (req, res) => {
  const { id } = req.params;

  const success = taskService.toggleComplete(id);
  if (!success) {
    res.writeHead(404);
    return res.end(JSON.stringify({ error: "Task not found" }));
  }

  res.writeHead(204).end();
};

export const importTasks = async (req, res) => {
  if (!req.csvParser) {
    res.writeHead(400);
    return res.end(JSON.stringify({ error: "Content-Type must be text/csv" }));
  }

  try {
    const result = await taskService.importTasksFromCsvParser(req.csvParser);

    res.writeHead(201);
    res.end(JSON.stringify(result));
  } catch (err) {
    res.writeHead(400);
    res.end(
      JSON.stringify({ error: "Erro ao processar CSV", details: err.message })
    );
  }
};

