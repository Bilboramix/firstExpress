import express from "express";
import Task from "./models/task.js";
import init from "./utils/init.js";
import wipe from "./utils/wipe.js";

wipe();
init();
const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  console.log(new Date().toLocaleString() + "-" + req.method + "-" + req.path);
  next();
});

app.post("/createTask", function (req, res) {
  const requestKey = Object.getOwnPropertyNames(req.body);

  const taskKey = ["name", "description", "endDate", "status", "priority"];

  for (const key of requestKey) {
    console.log(key);
    if (!taskKey.includes(key)) return res.status(400).send("Bad request");
  }

  const myTask = new Task(req.body);
  console.log(myTask);
  myTask.save();
  res.json(myTask);
});

app.get("/getAllTasks", function (req, res) {
  res.json(Task.findAll());
});

app.get("/getTask", function (req, res) {
  const id = req.query.id;
  if (!id) return res.status(400).send("Missing id");
  const task = Task.findById(id);
  if (!task) return res.status(404).send("Task not found");
  res.json(task);
});

app.post("/updateTask", function (req, res) {
  const requestKey = Object.getOwnPropertyNames(req.body);
  const taskKey = ["id", "name", "description", "endDate", "status", "priority"];

  for (const key of requestKey) {
    if (!taskKey.includes(key)) return res.status(400).send("Bad request");
  }

  const task = Task.findById(req.body.id);
  Object.assign(task, req.body);
  task.save();
  res.json(task);
});

app.listen(3000, () => {
  console.log("Server started");
});
