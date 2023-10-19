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

app.listen(3000);
