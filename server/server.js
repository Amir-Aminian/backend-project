const express = require("express");
global.config = require("./config");

const app = express();

app.use(express.urlencoded({extended: false}));

app.listen(config.port, () => {
  console.log(`server is runing on port: ${config.port}`);
});
