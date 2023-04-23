const express = require("express");
const database = require("../database");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const uuid = require("uuid");
const bcrypt = require('bcrypt');
const authenticateToken = require("../middlewares/authenticateToken");

router.post(
  "/", 
  body(["email", "password"],"This field is required.").exists({checkFalsy: true}),
  body("email", "Please use a correct email format!").isEmail(), 
  body("password", "Password should be at least 8 characters long!").isLength({min: 8}), 
  authenticateToken,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return(res.status(400).json({errors: errors.array()}));
      };
      if (req.body.userData.signedIn === true) {
        if (req.body.userData.email === req.body.email) {
          return(res.status(400).json({error: "You cannot add your own email address as you have used it to create your account."}));
        };
        let users = await database('SELECT `email` FROM `db_users`') || [];
        let userIndex = users.findIndex((user) => user.email===req.body.email);
        if (userIndex!=-1) {
          let sharedUserId = await database(
            'SELECT `user_id` FROM `db_users` WHERE `email` = ?',
            [req.body.email]
          );
          let userId = await database(
            'SELECT `user_id` FROM `db_users` WHERE `email` = ?',
            [req.body.userData.email]
          );
          let status = await database(
            'SELECT `status` FROM `db_shared_users` WHERE `user_id` = ? AND `shared_user_id` = ?',
            [userId[0].user_id, sharedUserId[0].user_id ]
          ) || [];
          console.log(status)
          if (status.length != 0) {
            if (status[0].status == true) {
              return(res.status(400).json({error: "You have already added this email address to your account."}));
            } else if (status[0].status == false) {
              return(res.status(400).json({error: "We have already sent your request to the user.\nYou should wait for the confirmation."}));
            };            
          };
          const query = 'SELECT `password` FROM `db_users` WHERE `email` = ?';
          const value = [req.body.userData.email];
          let user = await database(query, value);
          if (await bcrypt.compare(req.body.password, user[0].password)) {
            const query = 'INSERT INTO `db_shared_users` VALUES (?, ?, ?, ?)';
            const values = [uuid.v4(), userId[0].user_id, sharedUserId[0].user_id, false];
            await database(query, values);
            return(res.status(200).json("Successfully added new user."));
          } else {
            return(res.status(400).json({error: "Invalid Email Address or Password."}));
          };
        } else {
          return(res.status(400).json({error: "Invalid Email Address or Password."}));
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
