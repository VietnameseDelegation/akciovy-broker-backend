import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { MoneyService } from './money.service';

@ApiTags('Money') // Groups endpoints under "Money"
@Controller('money')
export class MoneyController {
  constructor(private readonly moneyService: MoneyService) {}

  @Post()
  @ApiOperation({ summary: 'Get current balance of a user' })
  @ApiQuery({ name: 'username', required: true, description: 'Username of the account' })
  @ApiResponse({ status: 200, description: 'Current balance returned', type: Number })
  async getMoney(@Query('username') username: string) {
    return this.moneyService.getMoney(username);
  }

  @Post('add')
  @ApiOperation({ summary: 'Add money to a user account' })
  @ApiQuery({ name: 'username', required: true })
  @ApiQuery({ name: 'amount', required: true, description: 'Amount to add (positive number)' })
  @ApiResponse({ status: 200, description: 'Money added successfully', type: Number })
  async addMoney(
    @Query('username') username: string,
    @Query('amount') amount: string,
  ) {
    const numericAmount = parseFloat(amount);
    return this.moneyService.addMoney(username, numericAmount);
  }

  @Post('remove')
  @ApiOperation({ summary: 'Remove money from a user account' })
  @ApiQuery({ name: 'username', required: true })
  @ApiQuery({ name: 'amount', required: true, description: 'Amount to remove (positive number)' })
  @ApiResponse({ status: 200, description: 'Money removed successfully', type: Number })
  async removeMoney(
    @Query('username') username: string,
    @Query('amount') amount: string,
  ) {
    const numericAmount = parseFloat(amount);
    return this.moneyService.removeMoney(username, numericAmount);
  }
}
