const express = require("express");

const app = express();

global.config = require("./config");

console.log(global)

app.listen(config.port, () => {
  console.log(`server is runing on port:${config.port}`);
});
