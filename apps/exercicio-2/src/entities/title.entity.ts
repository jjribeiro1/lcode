import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Professor } from './professor.entity';

@Entity('title')
export class Title {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Professor, (professor) => professor.title)
  professors: Professor[];
}
