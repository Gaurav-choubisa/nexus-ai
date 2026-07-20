import { AppError } from "@nexus/shared";
import { LoginDto, RegisterUserDto } from "../dto";
import { PasswordService } from "./password.service";
import { UserRepository } from "../repositories/UserRepository";
import { JwtService } from "../utils/jwt";
import { User } from "../entities";

export class AuthService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  private toUserResponse(user: User) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      status: user.status,
      isEmailVerified: user.isEmailVerified,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
  async register(data: RegisterUserDto) {
    // Normalize email
    const email = data.email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new AppError("User already exists", 409);
    }

    // Hash password
    const passwordHash = await PasswordService.hash(data.password);

    // Create user
    const user = await this.userRepository.create({
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email,
      passwordHash,
    });

    const accessToken = JwtService.generateAccessToken({
      userId: user.id,
      email: user.email,
    });

    const refreshToken = JwtService.generateRefreshToken({
      userId: user.id,
      email: user.email,
    });

    return {
      user: this.toUserResponse(user),
      accessToken,
      refreshToken,
    };
  }

  async login(data: LoginDto) {
    const email = data.email.trim().toLowerCase();

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await PasswordService.compare(
      data.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const accessToken = JwtService.generateAccessToken({
      userId: user.id,
      email: user.email,
    });

    const refreshToken = JwtService.generateRefreshToken({
      userId: user.id,
      email: user.email,
    });

    user.lastLoginAt = new Date();
    await this.userRepository.update(user);

    return {
      user: this.toUserResponse(user),
      accessToken,
      refreshToken,
    };
  }

  async me(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      status: user.status,
      isEmailVerified: user.isEmailVerified,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
