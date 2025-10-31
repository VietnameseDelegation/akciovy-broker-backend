import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Stock } from 'src/entities/stocks.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Stock) private readonly stockRepository: Repository<Stock>,
  ) {}

  async buyStock(username: string, symbol: string, quantity: number, price: number) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new NotFoundException('User not found');

    const totalCost = quantity * price;
    if (user.money < totalCost) {
      throw new BadRequestException('Insufficient funds');
    }

    user.money -= totalCost;
    await this.userRepository.save(user);

    let stock = await this.stockRepository.findOne({ where: { user, symbol } });
    if (!stock) {
      stock = this.stockRepository.create({ user, symbol, quantity });
    } else {
      stock.quantity += quantity;
    }
    await this.stockRepository.save(stock);

    return { username: user.username, newBalance: user.money, stock };
  }


  async sellStock(username: string, symbol: string, quantity: number, price: number) {
  const user = await this.userRepository.findOne({ where: { username } });
  if (!user) throw new NotFoundException('User not found');

  const stock = await this.stockRepository.findOne({ where: { user, symbol } });
  if (!stock || stock.quantity < quantity) {
    throw new BadRequestException('Not enough stock to sell');
  }

  stock.quantity -= quantity;
  if (stock.quantity === 0) {
    await this.stockRepository.remove(stock); // remove if none left
  } else {
    await this.stockRepository.save(stock);
  }

  user.money += quantity * price;
  await this.userRepository.save(user);

  return { username: user.username, newBalance: user.money, stock };
}

 async getPortfolio(username: string, currentPrices: Record<string, number>) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['stocks'],
    });
    if (!user) throw new NotFoundException('User not found');

    // Map each stock to include total value
    const portfolio = user.stocks.map(stock => ({
      symbol: stock.symbol,
      quantity: stock.quantity,
      currentPrice: currentPrices[stock.symbol] ?? 0, // current market price
      totalValue: (currentPrices[stock.symbol] ?? 0) * stock.quantity,
    }));

    return { username: user.username, money: user.money, portfolio };
  }

}
