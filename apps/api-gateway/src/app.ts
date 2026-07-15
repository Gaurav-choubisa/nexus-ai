import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import routes from "./routes/index.js";
import { errorHandler } from "./middleware";
import { notFoundHandler } from "./middleware";
import { requestIdMiddleware } from "./middleware/request-id.middleware";
import { loggerMiddleware } from "./middleware/logger.middleware";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(requestIdMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(requestIdMiddleware);

app.use(loggerMiddleware);

app.use(morgan("dev"));

app.use("/api/v1", routes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
