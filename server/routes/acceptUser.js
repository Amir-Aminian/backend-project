const express = require("express");
const database = require("../database");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");

router.put("/", authenticateToken, async (req, res) => {
  try {
    if (req.body.userData.signedIn === true) {
      await database('SET autocommit = 0');
      await database('START TRANSACTION');
      const query = 'UPDATE `db_shared_users` SET `status` = ? WHERE `shared_id` = ?';
      const value = [true, req.body.sharedId];
      await database(query, value);
      const userId = await database('SELECT `user_id` FROM `db_shared_users` WHERE `shared_id` = ?', [req.body.sharedId]);
      const userEmail = await database('SELECT `email` FROM `db_users` WHERE `user_id` = ?', [userId[0].user_id]);
      await database('COMMIT');
      return(res.status(200).json({message: "Successfully accepted the user invitation.", email: userEmail[0].email}));
    } else {
      return(res.status(400).json("Please sign in."));
    };
  } catch (error) {
    await database('ROLLBACK');
    return(res.status(400).json(error));
  };
});

module.exports = router;
