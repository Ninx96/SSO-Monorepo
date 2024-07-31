var express = require("express")
const { isAuthenticated } = require("../middlewares/auth.middleware")
const authService = require("../services/auth.service")
var authRouter = express.Router()

authRouter.get("/login", isAuthenticated, function (req, res) {
  const redirectUrl = req.query.redirectUrl
  res.render("login", { title: "User Login", redirectUrl })
})

authRouter.post("/login", function (req, res, next) {
  try {
    const { email, password } = req.body
    const { redirectUrl } = req.query
    const userSession = authService.verifyUser(email, password)

    res.cookie("sessionID", userSession.id, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: false, // Ensures the cookie is only sent over HTTPS
      maxAge: 3600000 * 12, // Cookie expiry time in milliseconds (12 hour)
      sameSite: "strict", // Helps protect against CSRF attacks
    })

    if (redirectUrl) return res.redirect(`${redirectUrl}?sessionToken=${userSession.id}`)
    res.redirect("/" + userSession.id)
  } catch (error) {
    next(error)
  }
})

authRouter.post("/verify", function (req, res, next) {
  try {
    const { sessionToken } = req.query
    const jwt = authService.verifySessionToken(sessionToken)
    res.send({
      isValid: true,
      data: jwt,
      errors: [],
    })
  } catch (error) {
    next(error)
  }
})

module.exports = authRouter
