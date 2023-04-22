const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express();
const static__dir = path.resolve(path.join(__dirname, "../client/build"));
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(static__dir));
app.use(cookieParser());
app.use("/api/signUp", require("./routes/signUp"));
app.use("/api/signIn", require("./routes/signIn"));
app.use("/api/forgotPassword/SQ", require("./routes/getSQ"));
app.use("/api/forgotPassword/SA", require("./routes/checkSA"));
app.use("/api/forgotPassword/reset", require("./routes/resetPassword"));
app.use("/api/homePage", require("./routes/homePage"));
app.use("/api/addTask", require("./routes/addTask"));
app.use("/api/deleteTask", require("./routes/deleteTask"));
app.use("/api/updateTask", require("./routes/updateTask"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(static__dir, 'index.html'));
});

app.listen(port, () => {
  console.log(`server is runing on port: ${port}`);
});
