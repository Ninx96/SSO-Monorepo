const uuid = require("uuid").v4

function User(email, password) {
  this.id = uuid().replace("-", "")
  this.email = email
  this.password = password
}

module.exports = {
  User,
}
