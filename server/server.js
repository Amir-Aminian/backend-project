const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express();
const static__dir = path.resolve(path.join(__dirname, "../client/build"));
const port = process.env.PORT || "8080";

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
app.use("/api/getSharedUsers", require("./routes/getSharedUsers"));
app.use("/api/manageSharedUsers", require("./routes/manageSharedUsers"));
app.use("/api/shareRequests", require("./routes/shareRequests"));
app.use("/api/deleteUser", require("./routes/deleteUser"));
app.use("/api/acceptUser", require("./routes/acceptUser"));
app.use("/api/addTask", require("./routes/addTask"));
app.use("/api/deleteTask", require("./routes/deleteTask"));
app.use("/api/updateTask", require("./routes/updateTask"));
app.use("/api/clearCookies", require("./routes/clearCookies"));
app.use("/api/shareUser", require("./routes/shareUser"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(static__dir, 'index.html'));
});

app.listen(port, () => {
  console.log(`server is runing on port: ${port}`);
});
