import jwt, {
  type JwtPayload,
  type SignOptions,
  type VerifyOptions,
} from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config";

export interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
}

export class JwtService {
  /**
   * Generate Access Token
   */
  static generateAccessToken(payload: TokenPayload): string {
    const options: SignOptions = {
      algorithm: jwtConfig.algorithm,
      expiresIn: jwtConfig.accessTokenExpiry,
    };

    return jwt.sign(payload, jwtConfig.privateKey, options);
  }

  /**
   * Generate Refresh Token
   */
  static generateRefreshToken(payload: TokenPayload): string {
    const options: SignOptions = {
      algorithm: jwtConfig.algorithm,
      expiresIn: jwtConfig.refreshTokenExpiry,
    };

    return jwt.sign(payload, jwtConfig.privateKey, options);
  }

  /**
   * Verify Access Token
   */
  static verifyAccessToken(token: string): TokenPayload {
    const options: VerifyOptions = {
      algorithms: [jwtConfig.algorithm],
    };

    return jwt.verify(token, jwtConfig.publicKey, options) as TokenPayload;
  }

  /**
   * Verify Refresh Token
   */
  static verifyRefreshToken(token: string): TokenPayload {
    const options: VerifyOptions = {
      algorithms: [jwtConfig.algorithm],
    };

    return jwt.verify(token, jwtConfig.publicKey, options) as TokenPayload;
  }
}
