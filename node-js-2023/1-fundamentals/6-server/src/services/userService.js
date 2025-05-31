import { randomUUID } from "node:crypto";
import { database } from "../database.js";

export function create({ name, email }) {
  const user = {
    id: randomUUID(),
    name,
    email,
  };

  database.insert("users", user);
  return user;
}

export function list(search) {
  return database.select(
    "users",
    search ? { name: search, email: search } : null
  );
}

export function update(id, { name, email }) {
  const existing = findById(id);
  if (!existing) return false;

  database.update("users", id, { name, email });
  return true;
}

export function remove(id) {
  const existing = findById(id);
  if (!existing) return false;

  database.delete("users", id);
  return true;
}

export function findById(id) {
  return database.select("users").find((user) => user.id === id);
}
