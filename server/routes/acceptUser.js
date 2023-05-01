const express = require("express");
const database = require("../database");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");

router.put("/", authenticateToken, async (req, res) => {
  try {
    if (req.body.userData.signedIn === true) {
      const query = 'UPDATE `db_shared_users` SET `status` = ? WHERE `shared_id` = ?';
      const value = [true, req.body.sharedId];
      await database(query, value);
      return(res.status(200).json("Successfully accepted the user invitation."));
    } else {
      return(res.status(400).json("Please sign in."));
    };
  } catch (error) {
    return(res.status(400).json(error));
  };
});

module.exports = router;
