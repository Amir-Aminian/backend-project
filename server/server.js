const express = require("express");
global.config = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/", require("./routes/user"));

app.listen(config.port, () => {
  console.log(`server is runing on port: ${config.port}`);
});
