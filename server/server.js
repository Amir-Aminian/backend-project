const express = require("express");
global.config = require("./config");
let users = require("./users");

const app = express();

app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
  res.status(200).json(users);
});

app.get("/:id", (req, res) => {
  let user = users.find((user) => {
    if(user.id == req.params.id) {
      return(user);
    };
  });
  res.status(200).json(user);
});

app.post("/", (req, res) => {
  req.body.id = parseInt(req.body.id);
  users.push(req.body);
  res.status(200).json("New user added successfully!");
});

app.listen(config.port, () => {
  console.log(`server is runing on port: ${config.port}`);
});
