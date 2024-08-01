const { Session } = require("../../schemas/session.schema")

const db = []

function getSessionById(sessionId) {
  return db.find((session) => session.id === sessionId)
}

function createUserSession(userData) {
  const idx = db.push(new Session(userData))
  return db[idx - 1]
}

module.exports = {
  getSessionById,
  createUserSession,
}
