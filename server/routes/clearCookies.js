const clearCookies = (req, res) => {
  res.status(200).clearCookie("access_token");
  return(res.status(200).json("Successfully logged out."));
}

module.exports = clearCookies;
