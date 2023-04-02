const express = require("express");
const database = require("../database");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

router.post(
  "/", 
  body(["email", "SA1", "SA2", "SA3"],"This field is required.").exists({checkFalsy: true}),
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
        const query = 'SELECT `SA1`, `SA2`, `SA3` FROM `db_users` WHERE `email` = ?';
        const value = [req.body.email];
        const userData = await database(query, value);
        if (req.body.SA1===userData[0].SA1 && req.body.SA2===userData[0].SA2 && req.body.SA3===userData[0].SA3) {
          const accessToken = jwt.sign({email: user.email}, secretKey);
          res.status(200).cookie("access_token", "Bearer " + accessToken,{httpOnly: true, secure: false, sameSite: "lax"});
          return(res.status(200).json(true));
        } else {
          return(res.status(200).json(false));
        };
      };
    } catch (error) {
      res.status(400).json(error);
    };
  }
);

module.exports = router;
