import { Controller, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('reset-issues')
  async resetIssues(@Res() res: Response) {
    const affectedUsers = await this.usersService.resetIssuesFlag();
    return res.status(200).json({
      status: 'success',
      message: `Updated ${affectedUsers} users with issues.`,
    });
  }
}
