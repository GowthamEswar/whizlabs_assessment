import { UserModel } from "../types/response";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

const APP_SECRET = "our_app_secret";

export const VerifyToken = async (req: any, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const payload = await jwt.verify(token.split(" ")[1], APP_SECRET);
  req.user = payload;

  next();
};

export const VerifyUser = async (req: any, res: Response, next: NextFunction) => {
  if (req.user.user_type !== 'SELLER') return res.status(403).json({ message: 'permission requried for authorization' });
  next();
};
