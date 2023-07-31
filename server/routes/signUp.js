const express = require("express");
const database = require("../database");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const uuid = require("uuid");
const bcrypt = require('bcryptjs');
const sendMail = require("../middlewares/sendMail");
const signUpEmail = require("../middlewares/signupEmail");
const jwt = require("jsonwebtoken");
const secretKey = process.env.VSECRETKEYE;
const website = process.env.WEBSITE;

router.post(
  "/", 
  body(["username", "email", "password", "confirmPassword", "SQ1", "SA1", "SQ2", "SA2", "SQ3", "SA3"],"This field is required.").exists({checkFalsy: true}),
  body("email", "Please use a correct email format!").isEmail(), 
  body(["password", "confirmPassword"], "Password should be at least 8 characters long!").isLength({min: 8}), 
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return(res.status(400).json({errors: errors.array()}));
      };
      let user = await database('SELECT `email` FROM `db_users` WHERE `email` = ?', [req.body.email]) || [];
      if (user.length > 0) {
        return(res.status(400).json({error: "This Email Address has already been used before.\nPlease sign in or try to sign up agian with a new Email Address."}));
      } else {
        if (req.body.password != req.body.confirmPassword) {
          return(res.status(400).json({error: "Password does not match."}));
        } else {
          const user = {id: uuid.v4(), ...req.body};
          delete user.confirmPassword;
          const saltRounds = await bcrypt.genSalt();
          user.password = await bcrypt.hash(user.password, saltRounds);
          const query = 'INSERT INTO `db_users` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
          const values = [user.id, user.username, user.email, user.password, user.SQ1, user.SA1, user.SQ2, user.SA2, user.SQ3, user.SA3, false, true, true, true];
          await database(query, values);
          const accessToken = jwt.sign({email: user.email}, secretKey, {expiresIn: "5m"});
          const vLink = `${website}/emailVerification/${accessToken}`;
          const sent = await sendMail(user.email, signUpEmail(user.username, vLink), "Do not reply - Complete your Sign up");
          if (sent.err) {
            return(res.status(400).json("Something went wrong please try again later."));
          } else if (sent == true) {
            const query = 'DELETE FROM `db_users` WHERE `email` = ? AND `verified` = ?';
            const values = [user.email, false];            
            setTimeout(async () => {await database(query, values)}, 300000);
            return(res.status(200).json("Verification email sent!\nPlease check your email inbox, spam or junk mail. You need to verify your email address to activate your account."));
          };
        };
      };
    } catch (error) {
      return(res.status(400).json(error));
    };
  }
);

module.exports = router;
