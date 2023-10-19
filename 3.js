import express from "express";
import Task from "./models/task.js";
import init from "./utils/init.js";
import wipe from "./utils/wipe.js";

wipe();
init();
const app = express();

app.use(function (req, res, next) {
  console.log(new Date().toLocaleString() + "-" + req.method + "-" + req.path);
  next();
});

app.get("/", function (req, res) {
  try {
    const myTask = new Task("Faire les courses", "Auchan", "2021-10-10", "En cours", "Haute");
    myTask.save();
  } catch (error) {
    console.log("J'ai crash", error.message);
    res.status(500).send("Erreur interne");
  }
});

app.listen(3000);
