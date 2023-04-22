const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEYE;

const authenticateToken = (req, res, next) => {
  const access_token = req.cookies.access_token;
  const token = access_token && access_token.split(" ")[1];
  if (token == null) {
    return(res.status(400).json({error: "No TOKEN is available."}));
  } else {
    jwt.verify(token, secretKey, (err, data) => {
      if (err) {
        return(res.status(400).json({error: "The TOKEN is no longer valid."}));
      } else {    
        req.body.userData = data;
        next();
      };
    })
  };
}

module.exports = authenticateToken;
