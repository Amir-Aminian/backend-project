const express = require("express");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const uuid = require("uuid");
const bcrypt = require('bcrypt');
const authenticateToken = require("../middlewares/authenticateToken");
const saltRounds = 10;

// router.get("/", authenticateToken,(req, res) => {
//   res.status(200).json(users.filter(user => user.email === req.user.email));
// });

// router.get("/:id", (req, res) => {
//   let user = users.find((user) => {
//     if(user.id == req.params.id) {
//       return(user);
//     };
//   });
//   res.status(200).json(user);
// });

// router.post(
//   "/register", 
//   body(["username", "email", "password", "confirmPassword", "SQ1", "SA1", "SQ2", "SA2", "SQ3", "SA3"],"This field is required.").exists({checkFalsy: true}),
//   body("email", "Please use a correct email format!").isEmail(), 
//   body("password", "Password should be at least 8 characters long!").isLength({min: 8}), 
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return(res.status(400).json({errors: errors.array()}));
//     };
//     let userDataBase = users || [];
//     let userIndex = userDataBase.findIndex((user) => user.email===req.body.email);
//     if (userIndex!=-1) {
//       return(res.status(400).json({error: "This Email Address has already been used befor.\nPlease sign in or try to sign up agian with a new Email Address."}));
//     } else {
//       if (req.body.password != req.body.confirmPassword) {
//         return(res.status(400).json({error: "Password does not match."}));
//       } else {
//         req.body.id = uuid.v4();
//         await bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
//           req.body.password = hash;
//           req.body.confirmPassword = hash;
//         });
//         req.body.validated = false;
//         userDataBase.push(req.body);
//         res.status(200).json("Successfully added new user!");
//       };
//     };
//   }
// );

// router.put(
//   "/update/:id",
//   body("email", "Please use a correct email format!").isEmail(),
//   body("password", "Password should be at least 8 characters long!").isLength({min: 8}),
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return(res.status(400).json({errors: errors.array()}));
//     };
//     users = users.map((user) => {
//       if (user.id == req.params.id) {
//         req.body.id = parseInt(req.body.id);
//         return(req.body);
//       } else {
//         return(user);
//       };
//     });
//     res.status(200).json(`Successfully updated user id: ${req.params.id}`);
//   }
// );

// router.delete("/:id", (req, res) => {
//   users = users.filter((user) => {
//     if (user.id != req.params.id) {
//       return(user);
//     };
//   });
//   res.status(200).json(`Successfully deleted user id: ${req.params.id}`);
// });

module.exports = router;
