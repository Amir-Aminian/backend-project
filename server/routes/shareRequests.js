const express = require("express");
const database = require("../database");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/", authenticateToken, async (req, res) => {
  try {
    if (req.body.userData.signedIn === true) {
      userId = await database(
        'SELECT `user_id` FROM `db_users` WHERE `email` = ?',
        [req.body.userData.email]
      );
      sharingData = await database(
        'SELECT `shared_id`, `user_id`, `status` FROM `db_shared_users` WHERE `shared_user_id` = ?',
        [userId[0].user_id]
      );
      if (sharingData.length == 0) {
        return(res.status(200).json({error: "You do not have any share requests."}));
      } else if (sharingData.length != 0) {
        const sharedData = await Promise.all(sharingData.map(async (data) => 
          await Promise.all([
            data.shared_id,
            database(
              'SELECT `username`, `email` FROM `db_users` WHERE `user_id` = ?',
              [data.user_id]
            ),
            data.status
          ])
        ));
        const result = sharedData.map((data)=>({sharedId: data[0], user: data[1][0].username, email: data[1][0].email, status: data[2]}));
        return(res.status(200).json(result));
      };      
    } else {
      return(res.status(400).json({error: "Please sign in."}));
    };
  } catch (error) {
    return(res.status(400).json(error));
  };
});

module.exports = router;
