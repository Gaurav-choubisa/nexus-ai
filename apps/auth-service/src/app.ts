import express from "express";
import helmet from "helmet";
import cors from "cors";
import authRoutes from "./routes/auth.route";
const app = express();

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    service: "Auth Service",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

export default app;
