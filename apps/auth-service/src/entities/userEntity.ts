import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { UserStatus } from "../enums";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  firstName!: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  lastName!: string;

  @Index("IDX_USER_EMAIL", { unique: true })
  @Column({
    type: "varchar",
    length: 255,
  })
  email!: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  passwordHash!: string;

  @Column({
    type: "enum",
    enum: UserStatus,
    enumName: "user_status",
    default: UserStatus.ACTIVE,
  })
  status!: UserStatus;

  @Column({
    type: "boolean",
    default: false,
  })
  isEmailVerified!: boolean;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  lastLoginAt!: Date | null;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamptz",
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    type: "timestamptz",
    nullable: true,
  })
  deletedAt!: Date | null;
}
