module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET || "shhhhhhhhhhhhhh",
    expiresIn: process.env.JWT_EXPIRE_AT || "1h",
  },
}
