import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from './entities/professor.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
  ) {}

  async getProfessorsCommittedHours() {
    const result = await this.professorRepository
      .createQueryBuilder('professor')
      .leftJoin('professor.subjects', 'subject')
      .leftJoin('subject.classes', 'class')
      .leftJoin('class.schedules', 'schedule')
      .select('professor.id', 'professorId')
      .addSelect('professor.name', 'professorName')
      .addSelect(
        'COALESCE(SUM(EXTRACT(EPOCH FROM (schedule.end_time - schedule.start_time)) / 3600), 0)',
        'committedHours',
      )
      .groupBy('professor.id')
      .addGroupBy('professor.name')
      .orderBy('professor.name', 'ASC')
      .getRawMany();

    return result.map((row) => ({
      professorId: parseInt(row.professorId),
      professorName: row.professorName,
      committedHours: parseFloat(row.committedHours),
    }));
  }
}
