const express = require("express");
const database = require("../database");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEYE;

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
      let user = await database('SELECT `email` FROM `db_users` WHERE `email` = ? AND `verified` = ?', [req.body.email, true]) || [];
      if (user.length == 0) {
        return(res.status(400).json({error: "Invalid Email Address."}));
      } else {
        const query = 'SELECT `SQ1`, `SQ2`, `SQ3` FROM `db_users` WHERE `email` = ?';
        const value = [user[0].email];
        const userData = await database(query, value);
        const accessToken = jwt.sign({email: user[0].email}, secretKey, {expiresIn: "1h"});
        res.status(200).cookie("access_token", "Bearer " + accessToken,{expires: new Date(Date.now() + 2 * 3600000), httpOnly: true, secure: true, sameSite: "lax"});
        return(res.status(200).json(userData));
      };
    } catch (error) {
      return(res.status(400).json(error));
    };
  }
);

module.exports = router;
