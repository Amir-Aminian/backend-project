const express = require("express");
const router = express.Router();
const {body, validationResult} = require("express-validator");
let users = require("../users");
const uuid = require("uuid");
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post(
  "/", 
  body(["username", "email", "password", "confirmPassword", "SQ1", "SA1", "SQ2", "SA2", "SQ3", "SA3"],"This field is required.").exists({checkFalsy: true}),
  body("email", "Please use a correct email format!").isEmail(), 
  body("password", "Password should be at least 8 characters long!").isLength({min: 8}), 
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return(res.status(400).json({errors: errors.array()}));
      };
      let userDataBase = users || [];
      let userIndex = userDataBase.findIndex((user) => user.email===req.body.email);
      if (userIndex!=-1) {
        return(res.status(400).json({error: "This Email Address has already been used befor.\nPlease sign in or try to sign up agian with a new Email Address."}));
      } else {
        if (req.body.password != req.body.confirmPassword) {
          return(res.status(400).json({error: "Password does not match."}));
        } else {
          req.body.id = uuid.v4();
          await bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            if (err) {
              return(res.status(400).json({error: "Could not hash the password."}));
            }
            req.body.password = hash;
            req.body.confirmPassword = hash;
          });
          req.body.validated = false;
          userDataBase.push(req.body);
          res.status(200).json("Successfully added new user!");
        };
      };
    } catch (error) {
      return(res.status(400).json(error));
    };
  }
);

module.exports = router;
