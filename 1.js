import express from "express";

const app = express();

app.get("/", function (req, res) {
  res.send("Coucou ça marche");
});

app.get("/test", function (req, res) {
  try {
    const foo = "un truc";
    foo.uneFonctionQuiNExistePas();
  } catch (error) {
    console.log("J'ai crash", error.message);
    res.status(500).send("Erreur interne");
  }
});

app.listen(3000);
