import app from "./app";

import { AppDataSource } from "./config/data-source";
import { env } from "./config/env";

async function authServer() {
  try {
    await AppDataSource.initialize();

    console.log("✅ Database Connected");

    app.listen(env.PORT, () => {
      console.log(`🚀 Auth Service running at http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error);

    process.exit(1);
  }
}

authServer();
