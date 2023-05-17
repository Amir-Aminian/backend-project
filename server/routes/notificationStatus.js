const express = require("express");
const database = require("../database");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/", authenticateToken, async (req, res) => {
  try {
    if (req.body.userData.signedIn === true) {
      const query = 'SELECT `notification` FROM `db_users` WHERE `email` = ?';
      const value = [req.body.userData.email];
      const notificationStatus = await database(query, value);
      return(res.status(200).json(notificationStatus[0]));
    } else {
      return(res.status(400).json({error: "Please sign in."}));
    };
  } catch (error) {
    return(res.status(400).json(error));
  };
});

module.exports = router;
