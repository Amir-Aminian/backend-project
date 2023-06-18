const express = require("express");
const database = require("../database");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");

router.put("/", authenticateToken, async (req, res) => {
  try {
    if (req.body.userData.signedIn === true) {
      if (req.body.taskId == undefined) {
        return(res.status(400).json({error: "You cannot delete another user's task."}));
      };
      await database('SET autocommit = 0');
      await database('START TRANSACTION');
      const query = 'DELETE FROM `db_tasks` WHERE `task_id` = ?';
      const value = [req.body.taskId];
      await database(query, value);
      await database('COMMIT');
      return(res.status(200).json({message: "Successfully deleted the task."}));
    } else {
      return(res.status(400).json({error: "Please sign in."}));
    };
  } catch (error) {
    await database('ROLLBACK');
    return(res.status(400).json(error));
  };
});

module.exports = router;
