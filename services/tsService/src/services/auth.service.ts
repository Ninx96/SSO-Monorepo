import * as userDatastore from "../database/datastores/local/user.datastore"

export function login(email: string, password: string) {
  const user = userDatastore.getUserByUsername(email)
  if (!user) throw new Error("user not found")
  if (user.password !== password) throw new Error("invalid username or password")
  return user
}
