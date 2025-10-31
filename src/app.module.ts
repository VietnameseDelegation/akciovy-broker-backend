// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from './login/login.module';
import { MoneyModule } from './money/money.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      synchronize: true,
      autoLoadEntities: true, // automatically load entities from feature modules
    }),
    LoginModule,
    MoneyModule, // only import the feature module here
  ],
})
export class AppModule {}
