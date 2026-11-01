import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DisciplinesService } from './disciplines.service.js';
import { CreateDisciplineDto } from './dto/create-discipline.dto.js';
import { UpdateDisciplineDto } from './dto/update-discipline.dto.js';

@Controller('disciplinas')
export class DisciplinesController {
  constructor(private readonly disciplinasService: DisciplinesService) {}

  @Post()
  crear(@Body() datosDisciplina: CreateDisciplineDto) {
    return this.disciplinasService.crear(datosDisciplina);
  }

  @Get()
  obtenerTodos() {
    return this.disciplinasService.obtenerTodos();
  }

  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.disciplinasService.obtenerUno(Number(id));
  }

  @Patch(':id')
  actualizar(
    @Param('id') id: string,
    @Body() datosDisciplina: UpdateDisciplineDto,
  ) {
    return this.disciplinasService.actualizar(Number(id), datosDisciplina);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.disciplinasService.eliminar(Number(id));
  }
}
