const express = require("express");
const database = require("../database");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/", authenticateToken, async (req, res) => {
  try {
    if (req.body.userData.signedIn === true) {
      const query = 'SELECT `task_id`, `username`, `task_date`, `task_color`, `task_color_label`, `task_title`, `task_start_time`, `task_end_time`, `task_description` FROM `db_tasks` WHERE `email` = ?';
      const value = [req.body.userData.email];
      let tasks = await database(query, value);
      return(res.status(200).json({tasks: tasks, signedIn: true}));
    } else {
      return(res.status(400).json({error: "Please sign in."}));
    };
  } catch (error) {
    return(res.status(400).json(error));
  };
});

module.exports = router;
