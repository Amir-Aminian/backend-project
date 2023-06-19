const express = require("express");
const database = require("../database");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = process.env.VSECRETKEYE;

router.post(
  "/",
  async (req, res) => {
    try {
      token = req.body.accessToken;
      if (token == null) {
        return(res.status(400).json({error: "The link is not valid.\nPlease try to sign up again."}));
      } else {
        jwt.verify(token, secretKey, async (err, data) => {
          if (err) {
            return(res.status(400).json({error: "The link is not valid.\nPlease try to sign up again."}));
          } else {    
            const query = 'UPDATE `db_users` SET `verified` = ? WHERE `email` = ?';
            const value = [true, data.email];
            await database(query, value);
            return(res.status(200).json("Your email was successfully verified.\nYou can now sign in to your account."));
          };
        })
      };
    } catch (error) {
      return(res.status(400).json(error));
    };
  }
);

module.exports = router;
