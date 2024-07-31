function isAuthenticated(req, res, next) {
  if (!req.cookies.sessionID) return next()
  const { redirectUrl } = req.query
  if (redirectUrl) return res.redirect(`${redirectUrl}?sessionToken=${req.cookies.sessionID}`)
  res.redirect("/")
}

module.exports = {
  isAuthenticated,
}
