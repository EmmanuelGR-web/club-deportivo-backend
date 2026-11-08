import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service.js';
import { CreateMessageDto } from './dto/create-message.dto.js';
import { UpdateMessageDto } from './dto/update-message.dto.js';

const datosRelacionados = { remitente: true, destinatario: true };

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  crear(datosMensaje: CreateMessageDto) {
    return this.prisma.message.create({
      data: datosMensaje,
      include: datosRelacionados,
    });
  }

  obtenerTodos() {
    return this.prisma.message.findMany({
      include: datosRelacionados,
      orderBy: { fecha: 'desc' },
    });
  }

  async obtenerUno(id: number) {
    const mensaje = await this.prisma.message.findUnique({
      where: { id },
      include: datosRelacionados,
    });
    if (!mensaje) {
      throw new NotFoundException(`No existe el mensaje ${id}.`);
    }
    return mensaje;
  }

  actualizar(id: number, datosMensaje: UpdateMessageDto) {
    return this.prisma.message.update({
      where: { id },
      data: datosMensaje,
      include: datosRelacionados,
    });
  }

  eliminar(id: number) {
    return this.prisma.message.delete({ where: { id } });
  }
}
