// backend/src/middlewares/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "devsecret";

export function auth(req: Request, _res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return next();

  try {
    req.user = jwt.verify(token, secret) as jwt.JwtPayload & { email: string };
  } catch (_) {
  }
  next();
}
