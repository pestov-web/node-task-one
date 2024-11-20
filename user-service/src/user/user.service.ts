import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async resetUserIssues(): Promise<number> {
    const usersWithIssues = await this.prisma.user.count({
      where: { hasIssues: true },
    });

    await this.prisma.user.updateMany({
      where: { hasIssues: true },
      data: { hasIssues: false },
    });

    return usersWithIssues;
  }
}
