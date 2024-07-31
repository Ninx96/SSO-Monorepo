var express = require("express")
const { isAuthenticated } = require("../middlewares/auth.middleware")

var router = express.Router()

/* GET users listing. */
router.get("/", isAuthenticated, function (req, res) {
  res.send("respond with a resource")
})

module.exports = router
