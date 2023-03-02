const express = require("express");
const { stat } = require("fs");
const path = require("path");
global.config = require("./config");

const app = express();
const static__dir = path.resolve(path.join(__dirname, "../client/public"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(static__dir));
app.use("/user", require("./routes/user"));

app.listen(config.port, () => {
  console.log(`server is runing on port: ${config.port}`);
  console.log(static__dir);
});
