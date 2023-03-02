const express = require("express");
const router = express.Router();
const {body, validationResult} = require("express-validator");
let users = require("../users");

router.get("/", (req, res) => {
  res.status(200).json(users);
});

router.get("/:id", (req, res) => {
  let user = users.find((user) => {
    if(user.id == req.params.id) {
      return(user);
    };
  });
  res.status(200).json(user);
});

router.post(
  "/", 
  body("email", "Please use a correct email format!").isEmail(), 
  body("password", "Password should be at least 8 characters long!").isLength({min: 8}), 
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return(res.status(400).json({errors: errors.array()}));
    };
    req.body.id = parseInt(req.body.id);
    users.push(req.body);
    res.status(200).json("Successfully added new user!");
  }
);

router.put(
  "/:id",
  body("email", "Please use a correct email format!").isEmail(),
  body("password", "Password should be at least 8 characters long!").isLength({min: 8}),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return(res.status(400).json({errors: errors.array()}));
    };
    users = users.map((user) => {
      if (user.id == req.params.id) {
        req.body.id = parseInt(req.body.id);
        return(req.body);
      } else {
        return(user);
      };
    });
    res.status(200).json(`Successfully updated user id: ${req.params.id}`);
  }
);

router.delete("/:id", (req, res) => {
  users = users.filter((user) => {
    if (user.id != req.params.id) {
      return(user);
    };
  });
  res.status(200).json(`Successfully deleted user id: ${req.params.id}`);
});

module.exports = router;
