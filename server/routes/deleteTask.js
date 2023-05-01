const express = require("express");
const database = require("../database");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");

router.put("/", authenticateToken, async (req, res) => {
  try {
    if (req.body.userData.signedIn === true) {
      if (req.body.taskId == undefined) {
        return(res.status(400).json("You cannot delete another user's task."));
      };
      const query = 'DELETE FROM `db_tasks` WHERE `task_id` = ?';
      const value = [req.body.taskId];
      await database(query, value);
      return(res.status(200).json("Successfully deleted the task."));
    } else {
      return(res.status(400).json({error: "Please sign in."}));
    };
  } catch (error) {
    return(res.status(400).json(error));
  };
});

module.exports = router;
