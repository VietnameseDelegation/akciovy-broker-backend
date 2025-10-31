import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class MoneyService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getMoney(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { username: user.username, money: user.money };
  }


  async addMoney(username: string, amount: number) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.money += amount;
    await this.userRepository.save(user);

    return { username: user.username, newBalance: user.money };
  }


  async removeMoney(username: string, amount: number) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.money < amount) {
      throw new BadRequestException('Insufficient funds');
    }

    user.money -= amount;
    await this.userRepository.save(user);

    return { username: user.username, newBalance: user.money };
  }
}
