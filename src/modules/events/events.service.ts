import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';

const datosRelacionados = { discipline: true };

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async crear(datosEvento: CreateEventDto) {
    await this.validarDatos(datosEvento);
    return this.prisma.event.create({
      data: datosEvento,
      include: datosRelacionados,
    });
  }

  obtenerTodos() {
    return this.prisma.event.findMany({
      include: datosRelacionados,
      orderBy: { fecha: 'asc' },
    });
  }

  async obtenerUno(id: number) {
    const evento = await this.prisma.event.findUnique({
      where: { id },
      include: datosRelacionados,
    });
    if (!evento) {
      throw new NotFoundException(`No existe el evento ${id}.`);
    }
    return evento;
  }

  async actualizar(id: number, datosEvento: UpdateEventDto) {
    await this.obtenerUno(id);
    await this.validarDatos(datosEvento);
    return this.prisma.event.update({
      where: { id },
      data: datosEvento,
      include: datosRelacionados,
    });
  }

  async eliminar(id: number) {
    await this.obtenerUno(id);
    return this.prisma.event.delete({ where: { id } });
  }

  private async validarDatos(datosEvento: UpdateEventDto) {
    if (datosEvento.disciplineId) {
      const disciplina = await this.prisma.discipline.findUnique({
        where: { id: datosEvento.disciplineId },
      });
      if (!disciplina) {
        throw new BadRequestException(
          `No existe la disciplina ${datosEvento.disciplineId}.`,
        );
      }
    }
  }
}
