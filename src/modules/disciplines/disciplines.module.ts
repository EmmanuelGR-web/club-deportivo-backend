import { Module } from '@nestjs/common';
import { DisciplinesService } from './disciplines.service.js';
import { DisciplinesController } from './disciplines.controller.js';

@Module({
  controllers: [DisciplinesController],
  providers: [DisciplinesService],
})
export class DisciplinesModule {}
