const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

// In-memory task list
let tasks = [];

app.get("/user", (req, res) => {
  res.render("user", { tasks });
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  if (task) tasks.push({ text: task });
  res.redirect("/user");
});

app.post("/delete", (req, res) => {
  const index = req.body.index;
  tasks.splice(index, 1);
  res.redirect("/user");
});

app.post("/update", (req, res) => {
  const index = req.body.index;
  const updatedTask = req.body.updatedTask;
  if (updatedTask) tasks[index].text = updatedTask;
  res.redirect("/user");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000/user");
});
