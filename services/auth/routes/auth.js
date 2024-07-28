var express = require("express")
const authService = require("../services/auth.service")
var authRouter = express.Router()

authRouter.get("/login", function (req, res) {
  res.render("login", { title: "Login" })
})

authRouter.post("/login", function (req, res, next) {
  try {
    const { email, password } = req.body
    const { redirectUrl } = req.query
    const userSession = authService.verifyUser(email, password)
    res.redirect(`${redirectUrl}?sessionToken=${userSession.id}`)
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
