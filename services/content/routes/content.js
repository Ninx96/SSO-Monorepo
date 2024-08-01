var express = require("express")
const { isAuthenticated, verifyToken } = require("../middlewares/auth.middleware")
const { getSessionById } = require("../data/stores/local/session.datastore")

var router = express.Router()

/* GET users listing. */
router.get("/", verifyToken, isAuthenticated, function (req, res) {
  res.send(getSessionById(req.cookies.sessionID).user)
})

module.exports = router
