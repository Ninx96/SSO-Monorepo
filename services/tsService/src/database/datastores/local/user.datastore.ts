import { UserSchema } from "../../schemas/user.schema"

const db: UserSchema[] = [
  {
    id: "0fda0a331b21416d8faa3343457a7db2",
    email: "john.doe@example.com",
    password: "123456",
  },
]

export function getUserByUsername(email: string): UserSchema | undefined {
  return db.find((user) => user.email === email)
}
