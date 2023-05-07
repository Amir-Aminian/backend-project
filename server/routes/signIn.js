const express = require("express");
const database = require("../database");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEYE;

router.post(
  "/", 
  body(["email", "password"],"This field is required.").exists({checkFalsy: true}),
  body("email", "Please use a correct email format!").isEmail(), 
  body("password", "Password should be at least 8 characters long!").isLength({min: 8}), 
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return(res.status(400).json({errors: errors.array()}));
      };
      const user = await database('SELECT `email`, `password` FROM `db_users` WHERE `email` = ? AND `verified` = ?', [req.body.email, true]) || [];
      if (user.length == 0) {
        return(res.status(400).json({error: "Invalid Email Address or Password."}));
      } else if (await bcrypt.compare(req.body.password, user[0].password)) {
        const accessToken = jwt.sign({email: user[0].email, signedIn: true}, secretKey, {expiresIn: "1h"});
        res.status(200).cookie("access_token", "Bearer " + accessToken,{expires: new Date(Date.now() + 2 * 3600000), httpOnly: true, secure: false, sameSite: "lax"});
        return(res.status(200).json("Successfully created jwt TOKEN."));
      } else {
        return(res.status(400).json({error: "Invalid Email Address or Password."}));
      };
    } catch (error) {
      return(res.status(400).json(error));
    };
  }
);

module.exports = router;
