import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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


//   findAll() {
//     return `This action returns all user`;
//   }

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
