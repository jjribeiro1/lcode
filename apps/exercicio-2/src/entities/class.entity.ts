import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Subject } from './subject.entity';
import { ClassSchedule } from './class_schedule.entity';

@Entity('class')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  semester: number;

  @Column()
  code: string;

  @ManyToOne(() => Subject, (subject) => subject.classes)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @OneToMany(() => ClassSchedule, (schedule) => schedule.class)
  schedules: ClassSchedule[];
}
