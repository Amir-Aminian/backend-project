const express = require("express");
const database = require("../database");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const bcrypt = require('bcryptjs');
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
      const user = await database('SELECT `email`, `password` FROM `db_users` WHERE `email` = ?', [req.body.email]) || [];
      if (user.length == 0) {
        return(res.status(400).json({error: "Invalid Email Address or Password."}));
      };
      const verifiedUser = await database('SELECT `email`, `password` FROM `db_users` WHERE `email` = ? AND `verified` = ?', [req.body.email, true]) || [];
      if (verifiedUser.length == 0) {
        return(res.status(400).json({error: "Please verify your email address first."}));
      } else if (await bcrypt.compare(req.body.password, verifiedUser[0].password)) {
        const accessToken = jwt.sign({email: verifiedUser[0].email, signedIn: true}, secretKey, {expiresIn: "8h"});
        res.status(200).cookie("access_token", "Bearer " + accessToken,{expires: new Date(Date.now() + 8 * 3600000), httpOnly: true, secure: false, sameSite: "strict"});
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
