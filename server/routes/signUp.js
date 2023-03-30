const express = require("express");
const database = require("../database");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const uuid = require("uuid");
const bcrypt = require('bcrypt');

router.post(
  "/", 
  body(["username", "email", "password", "confirmPassword", "SQ1", "SA1", "SQ2", "SA2", "SQ3", "SA3"],"This field is required.").exists({checkFalsy: true}),
  body("email", "Please use a correct email format!").isEmail(), 
  body("password", "Password should be at least 8 characters long!").isLength({min: 8}), 
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return(res.status(400).json({errors: errors.array()}));
      };
      let users = await database(`SELECT email FROM db_users`) || [];
      let userIndex = users.findIndex((user) => user.email===req.body.email);
      if (userIndex!=-1) {
        return(res.status(400).json({error: "This Email Address has already been used befor.\nPlease sign in or try to sign up agian with a new Email Address."}));
      } else {
        if (req.body.password != req.body.confirmPassword) {
          return(res.status(400).json({error: "Password does not match."}));
        } else {
          const user = {id: uuid.v4(), ...req.body};
          delete user.confirmPassword;
          const saltRounds = await bcrypt.genSalt();
          user.password = await bcrypt.hash(user.password, saltRounds);
          const query = 'INSERT INTO `db_users` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
          const values = [user.id, user.username, user.email, user.password, user.SQ1, user.SA1, user.SQ2, user.SA2, user.SQ3, user.SA3];
          await database(query, values);
          res.status(200).json("Successfully added new user.");
        };
      };
    } catch (error) {
      return(res.status(400).json(error));
    };
  }
);

module.exports = router;
