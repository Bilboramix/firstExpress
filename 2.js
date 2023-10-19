import Task from "./models/task.js";
import init from "./utils/init.js";
import wipe from "./utils/wipe.js";

wipe();
init();

const myTask = new Task("Faire les courses", "Auchan", "2021-10-10", "En cours", "Haute");

console.log(myTask);

myTask.save();
