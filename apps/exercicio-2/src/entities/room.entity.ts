import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Building } from './building.entity';
import { ClassSchedule } from './class_schedule.entity';

@Entity('room')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Building, (building) => building.rooms)
  @JoinColumn({ name: 'building_id' })
  building: Building;

  @OneToMany(() => ClassSchedule, (schedule) => schedule.room)
  schedules: ClassSchedule[];
}
