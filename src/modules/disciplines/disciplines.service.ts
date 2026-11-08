import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service.js';
import { CreateDisciplineDto } from './dto/create-discipline.dto.js';
import { UpdateDisciplineDto } from './dto/update-discipline.dto.js';

@Injectable()
export class DisciplinesService {
  constructor(private readonly prisma: PrismaService) {}

  crear(datosDisciplina: CreateDisciplineDto) {
    return this.prisma.discipline.create({ data: datosDisciplina });
  }

  obtenerTodos() {
    return this.prisma.discipline.findMany({ orderBy: { id: 'asc' } });
  }

  async obtenerUno(id: number) {
    const disciplina = await this.prisma.discipline.findUnique({
      where: { id },
    });
    if (!disciplina) {
      throw new NotFoundException(`No existe la disciplina ${id}.`);
    }
    return disciplina;
  }

  actualizar(id: number, datosDisciplina: UpdateDisciplineDto) {
    return this.prisma.discipline.update({
      where: { id },
      data: datosDisciplina,
    });
  }

  eliminar(id: number) {
    return this.prisma.discipline.delete({ where: { id } });
  }
}
