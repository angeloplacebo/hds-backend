import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export default function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header('auth-token')
  if (!token) return res.status(401).send('Access Denied')

  try {
    const verified = jwt.verify(token, String(process.env.TOKEN_SECRET))
    req.user = verified
    next()
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}
