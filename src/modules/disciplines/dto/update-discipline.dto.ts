import { PartialType } from '@nestjs/mapped-types';
import { CreateDisciplineDto } from './create-discipline.dto.js';

export class UpdateDisciplineDto extends PartialType(CreateDisciplineDto) {}
