const { User } = require("../../schemas/user.schema")

const db = [new User("john.doe@example.com", "123456")]

function getUserByUsername(email) {
  return db.find((user) => user.email === email)
}

function getUserById(userId) {
  return db.find((user) => user.id === userId)
}

module.exports = {
  getUserByUsername,
  getUserById,
}
