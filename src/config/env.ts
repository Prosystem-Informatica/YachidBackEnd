import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

interface EnvConfig {
  dbType: "mysql" | "postgres" | "sqlite";
  dbHost: string;
  dbPort: number;
  dbUsername: string;
  dbPassword: string;
  dbName: string;
  dbSync: boolean;
  dbLog: boolean;
  appPort: number;
  nodeEnv: string;
  jwtSecret: string;
}

const env: EnvConfig = {
  dbType: (process.env.DB_TYPE as "mysql" | "postgres" | "sqlite") || "mysql",
  dbHost: process.env.DB_HOST || "",
  dbPort: Number(process.env.DB_PORT) || 0,
  dbUsername: process.env.DB_USERNAME || "",
  dbPassword: process.env.DB_PASSWORD || "",
  dbName: process.env.DB_NAME || "",
  dbSync: process.env.DB_SYNC === "true",
  dbLog: process.env.DB_LOG === "true",
  appPort: Number(process.env.APP_PORT) || 0,
  nodeEnv: process.env.NODE_ENV || "",
  jwtSecret: process.env.JWT_SECRET || "default_secret",
};

export default env;
