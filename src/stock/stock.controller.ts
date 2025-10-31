import { Controller, Post, Query, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { StockService } from './stock.service';

@ApiTags('Stocks')
@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('buy')
  @ApiOperation({ summary: 'Buy stocks for a user for symbol use AAPL,TSLA,GOOGL' })
  @ApiQuery({ name: 'username', required: true })
  @ApiQuery({ name: 'symbol', required: true })
  @ApiQuery({ name: 'quantity', required: true })
  @ApiQuery({ name: 'price', required: true })
  @ApiResponse({ status: 200, description: 'Stock purchased successfully' })

  async buyStock(
    @Query('username') username: string,
    @Query('symbol') symbol: string,
    @Query('quantity') quantityStr: string,
    @Query('price') priceStr: string,
  ) {
    const quantity = parseInt(quantityStr);
    const price = parseFloat(priceStr);
    return this.stockService.buyStock(username, symbol, quantity, price);
  }

  @Post('sell')
@ApiOperation({ summary: 'Sell stocks for a user' })
@ApiQuery({ name: 'username', required: true })
@ApiQuery({ name: 'symbol', required: true })
@ApiQuery({ name: 'quantity', required: true })
@ApiQuery({ name: 'price', required: true })
@ApiResponse({ status: 200, description: 'Stock sold successfully' })

async sellStock(
  @Query('username') username: string,
  @Query('symbol') symbol: string,
  @Query('quantity') quantityStr: string,
  @Query('price') priceStr: string,
) {
  const quantity = parseInt(quantityStr);
  const price = parseFloat(priceStr);
  return this.stockService.sellStock(username, symbol, quantity, price);
}

@Get('portfolio')
  @ApiOperation({ summary: 'Get user portfolio with stock values for now we have only  AAPL= 180,TSLA = 900 GOOGL = 130'})
  @ApiQuery({ name: 'username', required: true })
  @ApiResponse({ status: 200, description: 'Portfolio returned' })
  async getPortfolio(
    @Query('username') username: string,
  ) {
    // Example: provide current prices (in real app fetch from API)
    const currentPrices = {
      AAPL: 180,
      TSLA: 900,
      GOOGL: 130,
    };

    return this.stockService.getPortfolio(username, currentPrices);
  }
}



