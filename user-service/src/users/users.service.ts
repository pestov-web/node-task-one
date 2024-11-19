import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async resetIssuesFlag(): Promise<number> {
    const result = await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ hasIssues: false })
      .where('hasIssues = :hasIssues', { hasIssues: true })
      .returning('id')
      .execute();

    return result.affected || 0;
  }
}
