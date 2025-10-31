import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
   @ApiProperty()
  id: number;

@ApiProperty()
  @Column()
  symbol: string;

  @Column('int')
  @ApiProperty()
  quantity: number;
 @ApiProperty()
  @ManyToOne(() => User, user => user.stocks)
  user: User;  // This connects the stock to the user
}

