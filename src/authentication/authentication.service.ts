import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AccessToken } from './types/access-token.interface';



@Injectable()
export class AuthenticationService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}


  async validateUser(username: string, password: string): Promise<User> {
    const user: User = await this.userService.findOneByUsername(username);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async login(user: any) {
    // Using `sub` to store user ID
    const payload = { username: user.username, sub: user.id }; 
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
  

  async register(user: RegisterRequestDto): Promise<AccessToken> {
    const existingUser = await this.userService.findOneByUsername(user.username);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
  
    const hashedPassword = await bcrypt.hash(user.password, 10);
    
    // Marking newUser as Partial<User> since we don't have all the properties yet (TypeORM will handle the generation of the id automatically)
    const newUser: Partial<User> = { ...user, password: hashedPassword };
  
    await this.userService.create(newUser as User);
    
    // Calling login() to generate the access token
    return this.login(newUser as User);
  }
  
  
  

  create(createAuthenticationDto: CreateAuthenticationDto) {
    return 'This action adds a new authentication';
  }

  findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
