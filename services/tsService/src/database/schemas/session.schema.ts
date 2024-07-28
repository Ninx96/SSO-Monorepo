export interface SessionSchema {
  id: string
  userId: string
  applications: Record<string, boolean>
}
