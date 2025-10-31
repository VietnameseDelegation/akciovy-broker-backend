import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique ID of the stock record' })
  id: number;

  @Column()
  @ApiProperty({ example: 'AAPL', description: 'Stock symbol (e.g. AAPL, TSLA, GOOGL)' })
  symbol: string;

  @Column('int')
  @ApiProperty({ example: 10, description: 'Number of shares owned' })
  quantity: number;

  @ManyToOne(() => User, user => user.stocks)
  @ApiProperty({ type: () => User, description: 'Owner of this stock' })
  user: User;
}
