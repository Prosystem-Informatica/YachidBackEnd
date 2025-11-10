import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não encontrado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const secretKey = process.env.JWT_SECRET || "default_secret";
    const { sub: user_id } = verify(token, secretKey) as IPayload;

    req.user = { id: user_id };
    next();
  } catch {
    throw new AppError("Token inválido", 401);
  }
}
