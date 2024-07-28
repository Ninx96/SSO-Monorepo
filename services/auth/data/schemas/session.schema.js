const uuid = require("uuid").v4

function Session(userId) {
  this.id = uuid().replace("-", "")
  this.userId = userId
}

module.exports = {
  Session,
}
