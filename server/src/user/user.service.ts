import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });


    if (existUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const { password: pass } = createUserDto;

    const hash = await bcrypt.hash(pass, 10);

    const res = await this.userRepo.save({
      ...createUserDto,
      password: hash,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rem } = res;

    return {
      message: 'Register successfully',
      result: rem,
    };
  }

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepo.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepo.findOne({ where: { email: email } });
  }
}
