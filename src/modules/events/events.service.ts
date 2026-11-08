import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';

const datosRelacionados = { discipline: true };

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  crear(datosEvento: CreateEventDto) {
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

  actualizar(id: number, datosEvento: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id },
      data: datosEvento,
      include: datosRelacionados,
    });
  }

  eliminar(id: number) {
    return this.prisma.event.delete({ where: { id } });
  }
}
