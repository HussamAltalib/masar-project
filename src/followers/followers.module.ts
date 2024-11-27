import { Module } from '@nestjs/common';
import { FollowerService } from './followers.service';
import { FollowerController } from './followers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './entities/follower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follower])],
  controllers: [FollowerController],
  providers: [FollowerService],
})
export class FollowersModule {}
