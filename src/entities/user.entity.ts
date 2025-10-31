import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Stock } from './stocks.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique ID of the user' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'john_doe', description: 'Unique username' })
  username: string;

  @Column()
  @ApiProperty({ example: 'secret123', description: 'User password (hashed in production)' })
  password: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @ApiProperty({ example: 1000.50, description: 'Current money balance' })
  money: number;

  @OneToMany(() => Stock, stock => stock.user)
  @ApiProperty({ type: () => [Stock], description: 'List of user-owned stocks' })
  stocks: Stock[];
}
