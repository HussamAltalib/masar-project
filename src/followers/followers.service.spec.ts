import { Test, TestingModule } from '@nestjs/testing';
import { FollowerService } from './followers.service';

describe('FollowersService', () => {
  let service: FollowerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowerService],
    }).compile();

    service = module.get<FollowerService>(FollowerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
