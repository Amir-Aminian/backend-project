const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const app = express();
const static__dir = path.resolve(path.join(__dirname, "./build"));
const port = process.env.PORT || "8080";
const server = require("http").createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({server: server});
const connect = require("./middlewares/connect");

wss.on("connection", function connection(ws) {
  connect(WebSocket ,wss, ws);
});

const winston = require("winston");
const winstonCloudWatch = require('winston-aws-cloudwatch');

// const logger = winston.createLogger({
//   level: "info",
//   transports: [],
// });

// logger.add(
//   new winstonCloudWatch({
//     logGroupName: 'App',
//     logStreamName: 'App',
//     createLogGroup: true,
//     createLogStream: true,
//     awsConfig: {
//       accessKeyId: 'accessKeyId',
//       secretAccessKey: 'secretAccessKey',
//       region: 'us-east-1'
//     }
//   })
// );

// logger.log('info', 'Successfully setup logger instance');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(static__dir));
app.use(cookieParser());
app.use("/api/signUp", require("./routes/signUp"));
app.use("/api/verifyEmail", require("./routes/verifyEmail"));
app.use("/api/signIn", require("./routes/signIn"));
app.use("/api/forgotPassword/SQ", require("./routes/getSQ"));
app.use("/api/forgotPassword/SA", require("./routes/checkSA"));
app.use("/api/forgotPassword/reset", require("./routes/resetPassword"));
app.use("/api/homePage", require("./routes/homePage"));
app.use("/api/getbadgeNotification", require("./routes/getBadgeNotification"));
app.use("/api/editBadgeNotification", require("./routes/editBadgeNotification"));
app.use("/api/notificationStatus", require("./routes/notificationStatus"));
app.use("/api/editNotification", require("./routes/editNotification"));
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

server.listen(port, () => {
  console.log(`server is runing on port: ${port}`);
});
