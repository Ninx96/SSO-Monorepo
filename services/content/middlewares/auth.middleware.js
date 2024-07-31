const { serviceUrls } = require("../config")

function isAuthenticated(req, res, next) {
  if (req.cookies.sessionID) next()
  const redirectURL = `${req.protocol}://${req.headers.host}${req.path}`
  res.redirect(`${serviceUrls.sso}/auth/login?redirectUrl=${redirectURL}`)
}

module.exports = {
  isAuthenticated,
}
