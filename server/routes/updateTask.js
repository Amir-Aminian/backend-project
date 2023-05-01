const express = require("express");
const database = require("../database");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const uuid = require("uuid");
const authenticateToken = require("../middlewares/authenticateToken");
const timeLimit = require("../middlewares/timeLimit");

router.post(
  "/", 
  body(["date", "taskTitle", "startTime", "endTime", "taskDescription", "color", "colorLabel"],"This field is required.").exists({checkFalsy: true}),
  authenticateToken,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return(res.status(400).json({errors: errors.array()}));
      };
      if (req.body.userData.signedIn === true) { 
        if (req.body.taskId == undefined) {
          return(res.status(400).json({error: "You cannot update or change another user's task."}));
        };       
        const userQuery = 'SELECT `user_id`, `username` FROM `db_users` WHERE `email` = ?';
        const userValue = [req.body.userData.email];
        let user = await database(userQuery, userValue);
        const tasksQuery = 'SELECT `task_date`, `task_color`, `task_color_label`, `task_title`, `task_start_time`, `task_end_time`, `task_description` FROM `db_tasks` WHERE `user_id` = ? AND `task_date` = ? AND NOT `task_id` = ?';
        const tasksValues = [user[0].user_id, req.body.date, req.body.taskId];
        let tasks = await database(tasksQuery, tasksValues) || [];  
        let conflict = 0;
    
        if (req.body.startTime > req.body.endTime) {
          return(res.status(400).json({error: "Task cannot end earlier than start time."}));
        } else if (req.body.startTime === req.body.endTime) {
          return(res.status(400).json({error: "Task cannot start and end at the same exact time."}));
        };
    
        if (timeLimit(req.body.startTime, req.body.endTime)) {
          return(res.status(400).json({error: "Task duration should at least be 15 minutes."}));
        };
    
        if (tasks.length === 0) {
          const deleteQuery = 'DELETE FROM `db_tasks` WHERE `task_id` = ?';
          const deleteValue = [req.body.taskId];
          await database(deleteQuery, deleteValue);
          const task = {id: uuid.v4(), userId: user[0].user_id, ...req.body};
          const query = 'INSERT INTO `db_tasks` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
          const values = [task.id, task.userId, task.date, task.taskTitle, task.startTime, task.endTime, task.taskDescription, task.color, task.colorLabel];
          await database(query, values);
          return(res.status(200).json("Successfully updated the task."));
        };
    
        tasks.forEach((data) => {
            if (((data.task_start_time <= req.body.startTime) && (req.body.startTime < data.task_end_time)) || ((data.task_start_time < req.body.endTime) && (req.body.endTime <= data.task_end_time))) {
                conflict++;
            } else if (((data.task_start_time >= req.body.startTime) && (data.task_start_time < req.body.endTime)) || ((data.task_end_time > req.body.startTime) && (req.body.endTime >= data.task_end_time))) {
                conflict++;
            }
        }); 
        
        if (conflict != 0) {
          return(res.status(400).json({error: "You cannot add this task due to a time conflict with another task."}));
          conflict = 0;
        } else {
          const deleteQuery = 'DELETE FROM `db_tasks` WHERE `task_id` = ?';
          const deleteValue = [req.body.taskId];
          await database(deleteQuery, deleteValue);
          const task = {id: uuid.v4(), userId: user[0].user_id, ...req.body};
          const query = 'INSERT INTO `db_tasks` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
          const values = [task.id, task.userId, task.date, task.taskTitle, task.startTime, task.endTime, task.taskDescription, task.color, task.colorLabel];
          await database(query, values);
          return(res.status(200).json("Successfully updated the task."));    
        };
      } else {
        return(res.status(400).json({error: "Please sign in."}));
      };
    } catch (error) {
      return(res.status(400).json(error));
    };
  }
);

module.exports = router;
