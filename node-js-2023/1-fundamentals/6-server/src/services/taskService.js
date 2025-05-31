import { randomUUID } from "node:crypto";
import { database } from "../database.js";

export function create({ title, description }) {
  const task = {
    id: randomUUID(),
    title,
    description,
    completed_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  database.insert("tasks", task);
  return task;
}

export function list(search) {
  return database.select(
    "tasks",
    search ? { title: search, description: search } : null
  );
}

export function update(id, data) {
  const task = findById(id);
  if (!task) return null;

  const updatedData = {
    ...data,
    updated_at: new Date().toISOString(),
  };

  database.update("tasks", id, updatedData);
  return true;
}

export function remove(id) {
  const task = findById(id);
  if (!task) return null;

  database.delete("tasks", id);
  return true;
}

export function toggleComplete(id) {
  const task = findById(id);
  if (!task) return null;

  const completed_at = task.completed_at ? null : new Date().toISOString();

  database.update("tasks", id, {
    completed_at,
    updated_at: new Date().toISOString(),
  });

  return true;
}

export function findById(id) {
  return database.select("tasks").find((task) => task.id === id);
}

export async function importTasksFromCsvParser(csvParser) {
  const tasksImported = [];
  let count = 0;

  for await (const record of csvParser) {
    const { title, description } = record;
    if (!title || !description) continue;

    const task = create({ title, description });
    tasksImported.push(task);
    count++;
  }

  return { imported: count, tasks: tasksImported };
}

