const jwt = require("jsonwebtoken")
const config = require("../config")

const userDatastore = require("../data/stores/local/user.datastore")
const sessionDatastore = require("../data/stores/local/session.datastore")

function verifyUser(email, password) {
  const user = userDatastore.getUserByUsername(email)
  if (!user) throw new Error("user not found")
  if (user.password !== password) throw new Error("invalid username or password")
  return sessionDatastore.createUserSession(user.id)
}

function verifySessionToken(sessionToken) {
  const session = sessionDatastore.getSessionById(sessionToken)
  if (!session) throw new Error("invalid session token")
  const user = userDatastore.getUserById(session.userId)
  if (!user) throw new Error("user not found")
  return createJWT(user)
}

function createJWT(payload) {
  return jwt.sign(payload, config.jwt.secret, config.jwt.expiresIn)
}

module.exports = {
  verifyUser,
  verifySessionToken,
}
