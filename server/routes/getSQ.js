const express = require("express");
const database = require("../database");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const bcrypt = require('bcrypt');

router.post(
  "/", 
  body("email","This field is required.").exists({checkFalsy: true}),
  body("email", "Please use a correct email format!").isEmail(), 
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return(res.status(400).json({errors: errors.array()}));
      };
      let users = await database('SELECT `email` FROM `db_users`') || [];
      let user = users.find((user) => user.email === req.body.email);
      if (user == null) {
        return(res.status(400).json({error: "Invalid Email Address."}));
      } else {
        const query = 'SELECT `SQ1`, `SQ2`, `SQ3` FROM `db_users` WHERE `email` = ?';
        const value = [req.body.email];
        const userData = await database(query, value);
        return(res.status(200).json(userData));
      };
    } catch (error) {
      res.status(400).json(error);
    };
  }
);

module.exports = router;
