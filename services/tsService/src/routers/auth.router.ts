import { NextFunction, Request, Response, Router } from "express"
import * as authService from "../services/auth.service"

export const authRouter = Router()

authRouter.post("/login", function (req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body
    const data = authService.login(email, password)
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})
