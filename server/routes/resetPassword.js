const express = require("express");
const database = require("../database");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const bcrypt = require('bcryptjs');
const authenticateToken = require("../middlewares/authenticateToken");

router.put(
  "/",
  body(["newPassword", "confirmNewPassword"],"This field is required.").exists({checkFalsy: true}),
  body(["newPassword", "confirmNewPassword"], "Password should be at least 8 characters long!").isLength({min: 8}),  
  authenticateToken,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return(res.status(400).json({errors: errors.array()}));
      };
      if (req.body.newPassword != req.body.confirmNewPassword) {
        return(res.status(400).json("Password does not match."));
      } else if (req.body.userData.validated === true) {
        const saltRounds = await bcrypt.genSalt();
        const newPassword = await bcrypt.hash(req.body.newPassword, saltRounds);
        const query = 'UPDATE `db_users` SET `password` = ? WHERE `email` = ?';
        const values = [newPassword, req.body.userData.email];
        await database(query, values);
        return(res.status(200).json("Successfully updated your password."));
      } else {
        return(res.status(400).json("Please answer security questions first."));
      };
    } catch (error) {
      return(res.status(400).json(error));
    };
  }
);

module.exports = router;
