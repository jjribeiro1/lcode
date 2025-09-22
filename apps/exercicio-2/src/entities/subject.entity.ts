import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SubjectPrerequisite } from './subject_prerequisite.entity';
import { Class } from './class.entity';
import { Professor } from './professor.entity';

@Entity('subject')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @ManyToOne(() => Professor, (professor) => professor.subjects)
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;

  @OneToMany(() => Class, (cls) => cls.subject)
  classes: Class[];

  @OneToMany(() => SubjectPrerequisite, (sp) => sp.subject)
  prerequisites: SubjectPrerequisite[];
}
