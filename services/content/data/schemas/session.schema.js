const uuid = require("uuid").v4

function Session(user) {
  this.id = uuid().replace("-", "")
  this.user = user
}

module.exports = {
  Session,
}
