const express = require("express");
const database = require("../database");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const authenticateToken = require("../middlewares/authenticateToken");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEYE;

router.post(
  "/", 
  body(["SA1", "SA2", "SA3"],"This field is required.").exists({checkFalsy: true}),
  authenticateToken,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return(res.status(400).json({errors: errors.array()}));
      };
      const query = 'SELECT `SA1`, `SA2`, `SA3` FROM `db_users` WHERE `email` = ?';
      const value = [req.body.userData.email];
      const userData = await database(query, value);
      if (req.body.SA1===userData[0].SA1 && req.body.SA2===userData[0].SA2 && req.body.SA3===userData[0].SA3) {
        const accessToken = jwt.sign({email: req.body.userData.email, validated: true}, secretKey, {expiresIn: "1h"});
        res.status(200).cookie("access_token", "Bearer " + accessToken,{expires: new Date(Date.now() + 2 * 3600000), httpOnly: true, secure: true, sameSite: "lax"});
        return(res.status(200).json(true));
      } else {
        return(res.status(400).json("You have entered wrong security question's answer."));
      };
    } catch (error) {
      return(res.status(400).json(error));
    };
  }
);

module.exports = router;
