import { Test, TestingModule } from '@nestjs/testing';
import { FollowerService } from './followers.service';
import { FollowerController } from './followers.controller';

describe('FollowerController', () => {
  let controller: FollowerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowerController],
      providers: [FollowerService],
    }).compile();

    controller = module.get<FollowerController>(FollowerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
