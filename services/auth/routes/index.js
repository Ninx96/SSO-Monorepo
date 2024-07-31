var express = require("express")
var router = express.Router()

/* GET home page. */
router.get("/", function (req, res) {
  console.log(req.cookies.sessionID)
  res.render("index", { title: "Single Sign On Service" })
})

module.exports = router
