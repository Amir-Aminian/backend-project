const express = require("express");
const database = require("../database");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/", authenticateToken, async (req, res) => {
  try {
    if (req.body.userData.signedIn === true) {
      const userQuery = 'SELECT `user_id`, `username` FROM `db_users` WHERE `email` = ?';
      const userValue = [req.body.userData.email];
      let user = await database(userQuery, userValue);
      const taskQuery = 'SELECT `task_id`, `task_date`, `task_color`, `task_color_label`, `task_title`, `task_start_time`, `task_end_time`, `task_description` FROM `db_tasks` WHERE `user_id` = ?';
      const taskValue = [user[0].user_id];
      let tasks = await database(taskQuery, taskValue);
      const sharedTasks = {user: user[0].username, ...tasks[0]}
      return(res.status(200).json({user: user[0].username, tasks: [sharedTasks], signedIn: true}));
    } else {
      return(res.status(400).json({error: "Please sign in."}));
    };
  } catch (error) {
    return(res.status(400).json(error));
  };
});

module.exports = router;
