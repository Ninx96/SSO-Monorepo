import { config } from "dotenv"
config()

import express, { NextFunction, Request, Response } from "express"
import createHttpError, { HttpError } from "http-errors"
import { authRouter } from "./routers/auth.router"

const port = process.env.PORT
const app = express()
app.use(express.json())

app.get("/", async (res: Response) => {
  res.send({
    message: "healthcheck",
  })
})

app.use("/api/v1/auth", authRouter)

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createHttpError(404))
})

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) {
    return next(err)
  }

  const rsp = {
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "" : err.stack,
  }

  // render the error page
  res.status(err.status || 500)
  res.send(rsp)
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
