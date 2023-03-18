const express = require("express");
const router = express.Router();
const {body, validationResult} = require("express-validator");
let users = require("../users");
let config = require("../config");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

router.post(
  "/", 
  body(["email", "password"],"This field is required.").exists({checkFalsy: true}),
  body("email", "Please use a correct email format!").isEmail(), 
  body("password", "Password should be at least 8 characters long!").isLength({min: 8}), 
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return(res.status(400).json({errors: errors.array()}));
      };
      let userDataBase = users || [];
      let user = userDataBase.find((user) => user.email === req.body.email);
      if (user == null) {
        return(res.status(400).json({error: "Invalid Email Address or Password."}));
      } else if (await bcrypt.compare(req.body.password, user.password)) {
        user = {email: user.email}
        const accessToken = jwt.sign(user, config.secretKey);
        res.status(200).json(accessToken);
      } else {
        return(res.status(400).json({error: "Invalid Email Address or Password."}));
      };
    } catch (error) {
      res.status(400).json(error);
    };
  }
);

module.exports = router;
