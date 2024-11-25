import { Injectable } from '@nestjs/common';
import { UserResponseDto} from './dto/user-response.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



@Injectable()
export class UserService {

  constructor(  
    @InjectRepository(User)
    private userRepository: Repository<User>, // Inject the User repository
  ) {}


  // Method to create a new user
  async create(user: Partial<User>): Promise<User> {
  const newUser = this.userRepository.create(user);
  return await this.userRepository.save(newUser);
}


// Method to find a user by their username
async findOneByUsername(username: string): Promise<User | undefined> {
  return await this.userRepository.findOne({ where: { username } });
}


async findAll(page: number, pageSize: number, search?: string): Promise<{ data: UserResponseDto[]; total: number }> {
  const skip = (page - 1) * pageSize;

  const queryBuilder = this.userRepository.createQueryBuilder('user');

  if (search) {
    queryBuilder.where('user.username LIKE :search', { search: `%${search}%` });
  }

  queryBuilder.skip(skip).take(pageSize);

  const [users, total] = await queryBuilder.getManyAndCount();

  // Map the users to UserResponseDto
  const data = users.map(user => ({
    id: user.id,
    username: user.username,
  }));

  return { data, total };
}

//   findOne(id: number) {
//     return `This action returns a #${id} user`;
//   }

//   update(id: number, updateUserDto: UpdateUserDto) {
//     return `This action updates a #${id} user`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} user`;
//   }
}
