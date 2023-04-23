const express = require("express");
const router = express.Router();

router.get(
  "/", 
  (req, res) => {
    res.status(200).clearCookie("access_token");
    return(res.status(200).json("You have successfully logged out."));
  }
);

module.exports = router;
