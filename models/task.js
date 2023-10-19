import { randomBytes } from "crypto";
import { writeFileSync, readdirSync, readFileSync, unlinkSync, existsSync } from "fs";
import { taskPath } from "../utils/paths.js";

export default class Task {
  id = "";
  name = "";
  description = "";
  endDate = "";
  status = "";
  priority = "";
  path = "";

  constructor(_task) {
    this.id = _task.id || randomBytes(16).toString("hex");
    this.name = _task.name;
    this.description = _task.description;
    this.endDate = _task.endDate;
    this.status = _task.status;
    this.priority = _task.priority;
    this.path = _task.path || `${taskPath}/${this.id}.json`;
  }

  static findAll() {
    const files = readdirSync(taskPath);
    const tasks = [];
    for (const file of files) {
      const task = readFileSync(`${taskPath}/${file}`);
      const rawTask = JSON.parse(task);
      tasks.push(new Task(rawTask));
    }
    return tasks;
  }

  save() {
    console.log("this :", this);
    writeFileSync(this.path, JSON.stringify(this));
    return this;
  }

  static findById(id) {
    const path = `${taskPath}/${id}.json`;
    if (!existsSync(path)) return null;

    const task = readFileSync(path);
    const rawTask = JSON.parse(task);
    return new Task(rawTask);
  }

  delete() {
    if (existsSync(this.path)) {
      unlinkSync(this.path);
      return this;
    }
    return null;
  }
}
