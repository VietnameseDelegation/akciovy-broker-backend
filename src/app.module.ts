// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from './login/login.module';
import { MoneyModule } from './money/money.module';
import { StockController } from './stock/stock.controller';
import { StockModule } from './stock/stock.module';
import { ControllerService } from './controller/controller.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      synchronize: true,
      autoLoadEntities: true, // automatically load entities from feature modules
    }),
    LoginModule,
    MoneyModule,
    StockModule, // only import the feature module here
  ],
  controllers: [StockController],
  providers: [ControllerService],
})
export class AppModule {}
