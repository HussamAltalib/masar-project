import {
  Controller,
  Post,
  Delete,
  Param,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { FollowerService } from './followers.service';


@Controller('followers')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id/follow')
  async followUser(@Param('id') followedId: string, @Request() req) {
    const followerId = req.user.userId;  // Assuming JWT Strategy sets userId in request
    return this.followerService.followUser(+followerId, +followedId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/w')
  async unfollowUser(@Request() req, @Param('id') followedId: number) {
    return this.followerService.unfollowUser(req.user.id, followedId);
  }

  @Get(':id/followers')
  async getFollowers(@Param('id') userId: number) {
    return this.followerService.getFollowers(userId);
  }

  @Get(':id/following')
  async getFollowing(@Param('id') userId: number) {
    return this.followerService.getFollowing(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('myProfile')
  async getMyProfile(@Request() req) {
    return req.user;
  }
}
