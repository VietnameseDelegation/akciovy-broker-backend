import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
    findAll(){
    return this.userRepository.find();
  }

  create(user: User) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
   
  update(){

  }
async delete(username: string, password: string) {
  return this.userRepository.delete({ username, password });
}
}