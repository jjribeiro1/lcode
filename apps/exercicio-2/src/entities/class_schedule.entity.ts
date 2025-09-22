import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Class } from './class.entity';
import { Room } from './room.entity';

@Entity('class_schedule')
export class ClassSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day_of_week: string;

  @Column({ type: 'timestamptz' })
  start_time: Date;

  @Column({ type: 'timestamptz' })
  end_time: Date;

  @ManyToOne(() => Class, (cls) => cls.schedules)
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @ManyToOne(() => Room, (room) => room.schedules)
  @JoinColumn({ name: 'room_id' })
  room: Room;
}
