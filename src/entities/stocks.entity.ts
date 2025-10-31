import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @Column('int')
  quantity: number;

  @ManyToOne(() => User, user => user.stocks)
  user: User;  // This connects the stock to the user
}
