import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Department } from './department.entity';
import { Title } from './title.entity';
import { Subject } from './subject.entity';

@Entity('professor')
export class Professor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Department, (department) => department.professors)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @ManyToOne(() => Title, (title) => title.professors)
  @JoinColumn({ name: 'title_id' })
  title: Title;

  @OneToMany(() => Subject, (subject) => subject.professor)
  subjects: Subject[];
}
