const { SSO_SERVICE_URL } = require("../config")
const axios = require("axios")
const jwt = require("jsonwebtoken")
const config = require("../config")
const { createUserSession } = require("../data/stores/local/session.datastore")

function isAuthenticated(req, res, next) {
  if (req.cookies.sessionID) next()
  const redirectURL = `${req.protocol}://${req.headers.host}${req.baseUrl}${req.path === "/" ? "" : req.path}`
  res.redirect(`${SSO_SERVICE_URL}/auth/login?redirectUrl=${redirectURL}`)
}

async function verifyToken(req, res, next) {
  const { sessionToken } = req.query
  if (!sessionToken) next()
  try {
    const resp = (await axios.post(`${SSO_SERVICE_URL}/auth/verify?sessionToken=${sessionToken}`)).data
    if (resp.isValid) {
      const userData = jwt.verify(resp.data, config.jwt.secret)
      const userSession = createUserSession(userData)
      res.cookie("sessionID", userSession.id, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: false, // Ensures the cookie is only sent over HTTPS
        maxAge: 3600000 * 12, // Cookie expiry time in milliseconds (12 hour)
        sameSite: "strict", // Helps protect against CSRF attacks
      })
    }
    next()
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = {
  isAuthenticated,
  verifyToken,
}
