const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return(res.status(400).json({error: "No TOKEN."}));
  } else {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return(res.status(400).json({error: "The TOKEN is no longer valid."}));
      } else {
        req.user = user;
        next();
      };
    })
  };
}

module.exports = authenticateToken;
