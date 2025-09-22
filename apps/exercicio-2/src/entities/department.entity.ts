import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Professor } from './professor.entity';

@Entity('department')
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Professor, (professor) => professor.department)
  professors: Professor[];
}
