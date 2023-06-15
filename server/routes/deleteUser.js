const express = require("express");
const database = require("../database");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");

router.put("/", authenticateToken, async (req, res) => {
  try {
    if (req.body.userData.signedIn === true) {
      const userId = await database('SELECT `user_id`, `shared_user_id` FROM `db_shared_users` WHERE `shared_id` = ?', [req.body.sharedId]);
      const userEmail = await database('SELECT `email` FROM `db_users` WHERE `user_id` = ?', [userId[0].user_id]);
      const sharedUserEmail = await database('SELECT `email` FROM `db_users` WHERE `user_id` = ?', [userId[0].shared_user_id]);
      const query = 'DELETE FROM `db_shared_users` WHERE `shared_id` = ?';
      const value = [req.body.sharedId];
      await database(query, value);
      if (req.body.userData.email == userEmail[0].email) {
        return(res.status(200).json({message: "Successfully deleted the user.", email: sharedUserEmail[0].email}));
      } else if (req.body.userData.email == sharedUserEmail[0].email) {
        return(res.status(200).json({message: "Successfully deleted the user.", email: userEmail[0].email}));
      };         
    } else {
      return(res.status(400).json("Please sign in."));
    };
  } catch (error) {
    return(res.status(400).json(error));
  };
});

module.exports = router;
