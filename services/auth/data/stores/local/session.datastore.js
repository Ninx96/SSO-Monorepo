const { Session } = require("../../schemas/session.schema")

const db = []

function getSessionById(sessionId) {
  return db.find((session) => session.id === sessionId)
}

function createUserSession(userId) {
  const idx = db.push(new Session(userId))
  return db[idx]
}

module.exports = {
  getSessionById,
  createUserSession,
}
