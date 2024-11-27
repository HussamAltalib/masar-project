import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follower } from './entities/follower.entity';

@Injectable()
export class FollowerService {
  constructor(
    @InjectRepository(Follower)
    private followerRepository: Repository<Follower>,
  ) {}

  async followUser(followerId: number, followedId: number): Promise<Follower> {
    const follower = this.followerRepository.create({
      followerId,
      followedId,
    });
    return await this.followerRepository.save(follower);
  }

  async unfollowUser(followerId: number, followedId: number): Promise<void> {
    const follow = await this.followerRepository.findOne({
      where: {
        followerId,
        followedId,
      },
    });
    if (!follow) {
      throw new NotFoundException('Follow relationship not found');
    }
    await this.followerRepository.remove(follow);
  }

  async getFollowers(userId: number) {
    return this.followerRepository.find({
      where: {
        followedId: userId,
      },
    });
  }

  async getFollowing(userId: number) {
    return this.followerRepository.find({
      where: {
        followerId: userId,
      },
    });
  }
}
