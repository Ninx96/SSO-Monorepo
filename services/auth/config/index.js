module.exports = {
  serviceTokens: {
    CONTENT: process.env.CONTENT_SEVICE_TOKEN,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRE_AT || "1h",
  },
}
