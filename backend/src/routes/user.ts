import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const router = Router();
const users = new Map<string, string>();
const secret = process.env.JWT_SECRET || "devsecret";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = schema.safeParse(req.body);
    if (!body.success)
      return next({ type: "validation", message: "invalid payload" });

    const { email, password } = body.data;

    if (users.has(email)) {
      res.status(400).json({ error: "user already exists" });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    users.set(email, hash);

    const token = jwt.sign({ email }, secret, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

router.post("/auth", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = schema.safeParse(req.body);
    if (!body.success)
      return next({ type: "validation", message: "invalid payload" });

    const { email, password } = body.data;

    const hash = users.get(email);
    if (!hash || !(await bcrypt.compare(password, hash))) {
      res.status(401).json({ error: "invalid credentials" });
      return;
    }

    const token = jwt.sign({ email }, secret, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

export default router;
