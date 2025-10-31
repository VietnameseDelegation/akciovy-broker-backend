import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { User } from 'src/entities/user.entity';
import { Stock } from 'src/entities/stocks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Stock])], // load only relevant entities
  providers: [StockService],
  controllers: [StockController]
})
export class StockModule {}
