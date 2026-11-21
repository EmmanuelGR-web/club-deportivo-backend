import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDisciplineDto } from './dto/create-discipline.dto.js';
import { UpdateDisciplineDto } from './dto/update-discipline.dto.js';

@Injectable()
export class DisciplinesService {
  constructor(private readonly prisma: PrismaService) {}

  async crear(datosDisciplina: CreateDisciplineDto) {
    await this.validarDatos(datosDisciplina);
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

  async actualizar(id: number, datosDisciplina: UpdateDisciplineDto) {
    await this.obtenerUno(id);
    await this.validarDatos(datosDisciplina, id);
    return this.prisma.discipline.update({
      where: { id },
      data: datosDisciplina,
    });
  }

  async eliminar(id: number) {
    await this.obtenerUno(id);
    return this.prisma.discipline.delete({ where: { id } });
  }

  private async validarDatos(
    datosDisciplina: UpdateDisciplineDto,
    id?: number,
  ) {
    if (datosDisciplina.nombre) {
      const otraDisciplina = await this.prisma.discipline.findUnique({
        where: { nombre: datosDisciplina.nombre },
      });
      if (otraDisciplina && otraDisciplina.id !== id) {
        throw new ConflictException(
          `Ya existe la disciplina ${datosDisciplina.nombre}.`,
        );
      }
    }
  }
}
