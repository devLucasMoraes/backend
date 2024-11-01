import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;

const sign = (payload: { id: number; email: string }) => {
  const jwtConfig: SignOptions = {
    algorithm: "HS256",
    expiresIn: "1d",
  };
  return jwt.sign(payload, secret, jwtConfig);
};

const veryfyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }
    const decoded = jwt.verify(token, secret);
    res.locals.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export { sign, veryfyToken };
