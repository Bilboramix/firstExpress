import { dataPath, taskPath } from "./paths.js";
import fs from "fs";

export default function init() {
  if (!fs.existsSync(dataPath)) {
    console.log("Le dossier data n'existe pas, création...");
    fs.mkdirSync(dataPath);
  }

  if (!fs.existsSync(taskPath)) {
    console.log("Le dossier data/tasks n'existe pas, création...");
    fs.mkdirSync(taskPath);
  }
}
