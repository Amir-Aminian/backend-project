const express = require("express");
const database = require("../database");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/", authenticateToken, async (req, res) => {
  try {
    if (req.body.userData.signedIn === true) {
      userId = await database(
        'SELECT `user_id` FROM `db_users` WHERE `email` = ?',
        [req.body.userData.email]
      );
      sharingData = await database(
        'SELECT `shared_id`, `shared_user_id` FROM `db_shared_users` WHERE `user_id` = ? AND `status` = ?',
        [userId[0].user_id, true]
      );
      if (sharingData.length == 0) {
        return(res.status(200).json({error: "You do not have any shared users."}));
      } else if (sharingData.length != 0) {
        const sharedData = await Promise.all(sharingData.map(async (data) => 
          await Promise.all([
            data.shared_id,
            // database(
            //   'SELECT `username` FROM `db_users` WHERE `user_id` = ?',
            //   [data.shared_user_id]
            // ),
            // database(
            //   'SELECT `task_date`, `task_color`, `task_color_label`, `task_title`, `task_start_time`, `task_end_time`, `task_description` FROM `db_tasks` WHERE `user_id` = ?',
            //   [data.shared_user_id]
            // )
            database(
              'SELECT db_users.username, db_tasks.task_date, db_tasks.task_color, db_tasks.task_color_label, db_tasks.task_title, db_tasks.task_start_time, db_tasks.task_end_time, db_tasks.task_description FROM db_users INNER JOIN db_tasks ON db_users.user_id = db_tasks.user_id WHERE db_users.user_id = ?',
              [data.shared_user_id]
            )
          ])
        ));
        let result = [];
        sharedData.map((data) => {
          for (let i = 0; i < data[1].length; i++) {
            data[1][i]["sharedId"] = data[0];
            result.push(data[1][i]);
          }
        });
        return(res.status(200).json(result));
      };      
    } else {
      return(res.status(400).json({error: "Please sign in."}));
    };
  } catch (error) {
    return(res.status(400).json(error));
  };
});

module.exports = router;
