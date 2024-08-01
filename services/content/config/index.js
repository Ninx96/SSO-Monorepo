module.exports = {
  SSO_SERVICE_URL: "http://sso.myapp.com:3000",
  jwt: {
    secret: process.env.JWT_SECRET || "shhhhhhhhhhhhhh",
    expiresIn: process.env.JWT_EXPIRE_AT || "1h",
  },
}
