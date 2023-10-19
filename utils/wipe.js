import fs from "fs";

export default function wipe() {
  if (fs.existsSync("data")) {
    fs.rmSync("data", { recursive: true });
  }
}
