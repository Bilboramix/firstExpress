import express from "express";
import Task from "./models/task.js";
import init from "./utils/init.js";
import logger from "./utils/logger.js";

// wipe();
init();

const app = express();
app.use(express.json());

app.use(logger);

app.get("/", function (req, res) {
  res.send("Coucou ça marche");
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
  if (!id) return res.status(400).send("Missing id query");
  const task = Task.findById(id);
  if (!task) return res.status(404).send("Task not found");
  res.json(task);
});

app.patch("/updateTask", function (req, res) {
  const requestKey = Object.getOwnPropertyNames(req.body);
  const taskKey = ["id", "name", "description", "endDate", "status", "priority"];

  for (const key of requestKey) {
    if (!taskKey.includes(key)) return res.status(400).send("Bad request");
  }

  const task = Task.findById(req.body.id);
  if (!task) return res.status(404).send("Task not found");

  Object.assign(task, req.body);
  task.save();
  res.json(task);
});

app.delete("/deleteTask", function (req, res) {
  const id = req.query.id;
  if (!id) return res.status(400).send("Missing id");

  const myTask = Task.findById(id);
  myTask.delete();
  res.send("Task deleted");
});

app.all("*", function (req, res) {
  res.status(404).send("Cette route n'existe pas, ou vous vous êtes trompé de méthode");
});

app.listen(3000, () => {
  console.log("Server started");
});

/* Raccourci pour if(maValeur){ return true } */

// const maValeur = 0;
// console.log(!!maValeur);

/* Transformer une string en objet : */

// const maString = `{"name":"toto","age":42}`;

// console.log(maString.name);

// const monObjet = JSON.parse(maString);
// console.log(monObjet);

// console.log(monObjet.name);
