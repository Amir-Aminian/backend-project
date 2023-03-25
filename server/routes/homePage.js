const express = require("express");
const database = require("../database");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/", authenticateToken, async (req, res) => {
  let users = await database(`SELECT * FROM db_users`) || [];
  res.status(200).json(users.filter(user => user.email === req.body.email));
});

module.exports = router;
