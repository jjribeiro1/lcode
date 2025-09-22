import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from './entities/professor.entity';
import { Subject } from './entities/subject.entity';
import { Class } from './entities/class.entity';
import { ClassSchedule } from './entities/class_schedule.entity';
import { Department } from './entities/department.entity';
import { Title } from './entities/title.entity';
import { Room } from './entities/room.entity';
import { Building } from './entities/building.entity';
import { SubjectPrerequisite } from './entities/subject_prerequisite.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'exercicio2',
      entities: [
        Professor,
        Subject,
        Class,
        ClassSchedule,
        Department,
        Title,
        Room,
        Building,
        SubjectPrerequisite,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Professor,
      Subject,
      Class,
      ClassSchedule,
      Department,
      Title,
      Room,
      Building,
      SubjectPrerequisite,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
