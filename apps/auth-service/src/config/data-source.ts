import "reflect-metadata";

import { DataSource } from "typeorm";

import { env } from "./env";
import { User } from "../entities";

export const AppDataSource = new DataSource({
  type: "postgres",

  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,

  synchronize: false,

  logging: env.NODE_ENV === "development",

  entities: [User],

  migrations: ["src/migrations/**/*.ts"],
});
