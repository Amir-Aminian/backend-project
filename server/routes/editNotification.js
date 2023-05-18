const express = require("express");
const database = require("../database");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");

router.put("/", authenticateToken, async (req, res) => {
  try {
    if (req.body.userData.signedIn === true) {
      const query = 'UPDATE `db_users` SET `notification` = ? WHERE `email` = ?';
      const value = [req.body.status ,req.body.userData.email];
      await database(query, value);
      if (req.body.status == true) {
        return(res.status(200).json("Now you will receive notifications 1 hour before your tasks start time."));
      } else if (req.body.status == false) {
        return(res.status(200).json("Your notification is turned off."));
      };
    } else {
      return(res.status(400).json({error: "Please sign in."}));
    };
  } catch (error) {
    return(res.status(400).json(error));
  };
});

module.exports = router;
