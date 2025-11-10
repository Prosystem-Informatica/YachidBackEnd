// src/server.ts
import "reflect-metadata";
import "dotenv/config";
import "./shared/container";
import { app } from "./app";
import { AppDataSource } from "./config/database";
import env from "./config/env";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");

    app.listen(env.appPort, () => {
      console.log(`Server running at http://localhost:${env.appPort}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

export { app };
