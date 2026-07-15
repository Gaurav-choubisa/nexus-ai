import "dotenv/config";

import app from "./app";
import { env } from "./config/env";

app.listen(env.PORT, () => {
  console.log(`🚀 API Gateway running at http://localhost:${env.PORT}`);
});
