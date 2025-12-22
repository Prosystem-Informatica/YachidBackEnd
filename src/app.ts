import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { router } from "./routes";
import { AppError } from "./shared/errors/AppError";
import "./shared/container";
import env from "./config/env";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(router);

app.get("/health", (req: Request, res: Response) => {
  return res.json({ status: "ok", env: env.nodeEnv });
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({
    message:
      err instanceof Error
        ? `Internal server error - ${err.message}`
        : "Internal server error",
  });
});
