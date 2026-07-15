import { Router } from "express";
import os from "node:os";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    requestId: req.requestId,
    service: "API Gateway",
    version: "1.0.0",
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: os.cpus().length,
    timestamp: new Date().toISOString(),
  });
});

export default router;
