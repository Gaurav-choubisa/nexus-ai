import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { SignOptions } from "jsonwebtoken";

const keysDir = resolve(process.cwd(), "keys");

export const jwtConfig = {
  algorithm: "RS256" as const,

  accessTokenExpiry: (process.env.JWT_ACCESS_TOKEN_EXPIRY ??
    "15m") as SignOptions["expiresIn"],

  refreshTokenExpiry: (process.env.JWT_REFRESH_TOKEN_EXPIRY ??
    "7d") as SignOptions["expiresIn"],

  privateKey: readFileSync(resolve(keysDir, "private.pem"), "utf8"),

  publicKey: readFileSync(resolve(keysDir, "public.pem"), "utf8"),
};
