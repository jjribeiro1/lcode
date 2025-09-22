import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Subject } from './subject.entity';

@Entity('subject_prerequisite')
export class SubjectPrerequisite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Subject, (subject) => subject.prerequisites)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @ManyToOne(() => Subject)
  @JoinColumn({ name: 'prerequisite_id' })
  prerequisite: Subject;
}
