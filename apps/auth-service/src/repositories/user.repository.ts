import { Repository } from "typeorm";

import { AppDataSource } from "../config/data-source";
import { User } from "../entities";

export class UserRepository {
  private readonly repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(user: Partial<User>): Promise<User> {
    const entity = this.repository.create(user);

    return this.repository.save(entity);
  }

  async findByEmail(email: string) {
    return this.repository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async update(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
