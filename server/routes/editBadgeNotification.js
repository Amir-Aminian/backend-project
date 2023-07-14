const express = require("express");
const database = require("../database");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");

router.put("/", authenticateToken, async (req, res) => {
  try {
    if (req.body.userData.signedIn === true) {
      if (req.body.badgeName === "badge1") {
        const query = 'UPDATE `db_users` SET `badge1` = ? WHERE `email` = ?';
        const value = [req.body.badgeNotification, req.body.userData.email];
        await database(query, value);
        return(res.status(200).json("Successfully changed the notification badge."));
      } else if (req.body.badgeName === "badge2") {
        const query = 'UPDATE `db_users` SET `badge2` = ? WHERE `email` = ?';
        const value = [req.body.badgeNotification, req.body.userData.email];
        await database(query, value);
        return(res.status(200).json("Successfully changed the notification badge."));
      };
    } else {
      return(res.status(400).json({error: "Please sign in."}));
    };
  } catch (error) {
    return(res.status(400).json(error));
  };
});

module.exports = router;
